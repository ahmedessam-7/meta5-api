# Import necessary packages
import MT5Manager
import logging
import dotenv
import os
import socket
import threading
import json
import time

# Main function
def main():

  # Load configuration from environment variables and parse it
  def load_config():
    dotenv.load_dotenv()

    socket_host = os.getenv('SOCKET_HOST')
    socket_port = int(os.getenv('SOCKET_PORT'))

    meta_host = os.getenv('META_HOST')
    meta_user = int(os.getenv('META_USER'))
    meta_password = os.getenv('META_PASSWORD')

    return {
      'socket': {
        'host': socket_host,
        'port': socket_port,
      },
      'meta': {
        'host': meta_host,
        'user': meta_user,
        'password': meta_password,
      },
    }

  # Define the configuration variable
  config = load_config()

  # Configure logging
  logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
  )

  # Create a socket object
  server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

  # Bind the socket to the provided address and port
  server_socket.bind((config['socket']['host'], config['socket']['port']))

  # Enable the server to accept connections
  server_socket.listen()
  logging.info(f"Server initialized on {config['socket']['host']}:{config['socket']['port']}")

  # List to keep track of connected clients
  clients = []

  # Handle communication with a single client
  def handle_client(client_socket, address):
    logging.info(f"New connection established with client: {address}")
    try:
      while True:
        data = client_socket.recv(1024).decode('utf-8')
        if data:
          logging.info(f"Received data from {address}: {data}")
    except Exception as e:
      logging.error(f"Error with client {address}: {e}")
    finally:
      clients.remove(client_socket)
      client_socket.close()
      logging.info(f"Client disconnected: {address}")

  # Broadcast a message to all connected clients
  def broadcast_message(message):
    for client in clients:
      try:
        client.sendall(message.encode('utf-8'))
      except Exception as e:
        logging.error(f"Failed to send message to a client: {e}")
        clients.remove(client)

  # Accept and handle incoming client connections
  def accept_clients():
    while True:
      client_socket, client_address = server_socket.accept()
      clients.append(client_socket)
      threading.Thread(target=handle_client, args=(client_socket, client_address), daemon=True).start()

  # Start the client acceptance thread
  threading.Thread(target=accept_clients, daemon=True).start()

  # Fetches all non-private and non-callable attributes of an object as a dictionary
  def get_object_attributes(obj):
    attrs = {key: getattr(obj, key) for key in dir(obj) if not key.startswith('__') and not callable(getattr(obj, key))}
    return attrs

  # Class for handling position updates
  class PositionSink:

    def OnPositionAdd(self, position):
      payload = {'event': 'positions/ADD', 'position': get_object_attributes(position)}
      broadcast_message(json.dumps(payload))

    def OnPositionUpdate(self, position):
      payload = {'event': 'positions/UPDATE', 'position': get_object_attributes(position)}
      broadcast_message(json.dumps(payload))

    def OnPositionDelete(self, position):
      payload = {'event': 'positions/DELETE', 'position': get_object_attributes(position)}
      broadcast_message(json.dumps(payload))

  # Class for handling deal updates
  class DealSink:

    def OnDealAdd(self, deal):
      payload = {'event': 'deals/ADD', 'deal': get_object_attributes(deal)}
      broadcast_message(json.dumps(payload))

    def OnDealUpdate(self, deal):
      payload = {'event': 'deals/UPDATE', 'deal': get_object_attributes(deal)}
      broadcast_message(json.dumps(payload))

    def OnDealDelete(self, deal):
      payload = {'event': 'deals/DELETE', 'deal': get_object_attributes(deal)}
      broadcast_message(json.dumps(payload))

  # Instantiate the handler classes for managing updates
  position_sink = PositionSink()
  deal_sink = DealSink()

  # Initialize the MT5 manager
  manager = MT5Manager.ManagerAPI()

  try:
    # Attempt to connect to the MT5 server
    if not manager.Connect(
      config['meta']['host'],
      config['meta']['user'],
      config['meta']['password'],
      MT5Manager.ManagerAPI.EnPumpModes.PUMP_MODE_POSITIONS
    ):
      logging.error('Failed to connect to the MT5 server')
      return

    logging.info('Successfully connected to the MT5 server')

    # Subscribe to position updates
    if not manager.PositionSubscribe(position_sink):
      logging.error('Failed to subscribe to position updates')
      return

    logging.info('Subscribed to position updates successfully')

    # Subscribe to deal updates
    if not manager.DealSubscribe(deal_sink):
      logging.error('Failed to subscribe to deal updates')
      return

    logging.info('Subscribed to deal updates successfully')

    # Run the main loop
    try:
      logging.info("Entering main loop. Press Ctrl+C to exit.")
      while True:
        time.sleep(10)
    except KeyboardInterrupt:
      logging.info('Shutdown requested by user')
    finally:
      # Unsubscribe and disconnect
      logging.info("Unsubscribing from position updates and disconnecting...")
      manager.PositionUnsubscribe(position_sink)
      manager.Disconnect()
      logging.info('Disconnected from the MT5 server')

  except Exception as e:
    logging.error(f"An unexpected error occurred: {e}")

  finally:
    # Ensure disconnect in case of errors
    if manager:
      manager.Disconnect()

# Execute the script
if __name__ == '__main__':
  main()
