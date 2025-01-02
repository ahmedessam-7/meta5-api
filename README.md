# Meta5 API

![Python](https://img.shields.io/badge/python-3.9%2B-blue)
![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)
![Version](https://img.shields.io/badge/version-2.0.0-yellow)

Meta5 API is a scalable backend service for the Meta 5 project, built with Python and Node.js.

## Features
1. HTTP server for handling WEB requests.
2. WebSocket support for real-time communication.
3. Logging mechanisms for error tracking and debugging.

## Setup and Installation

### Prerequisites
- **Python** (version 3.9 or higher)
- **Node.js** (version 16 or higher)
- **Package Managers**: `pip` for Python and `npm` or `yarn` for Node.js.

### Installation Steps
1. Clone the repository:
  ```bash
  git clone https://github.com/<username>/meta5-api.git
  cd meta5-api
  ```

2. Set up Python dependencies:
  ```bash
  cd python
  pip install -r requirements.txt
  ```

3. Set up Node.js dependencies:
  ```bash
  cd ../node
  npm install
  ```

4. Configure environment variables:
  - Create a `.env` file in both `python` and `node` directories.
  - Python file variables:
    - `SOCKET_HOST`: TCP socket host address for real-time communication between Python and Node.js
    - `SOCKET_PORT`: TCP socket port for real-time communication between Python and Node.js
    - `META_HOST`: Host address for the MT5 Manager API
    - `META_USER`: Username for authenticating with the MT5 Manager API
    - `META_PASSWORD`: Password for the MT5 Manager API
  - Node.js file variables:
    - `HTTP_HOST`: Host address for the HTTP server
    - `HTTP_PORT`: Port number for the HTTP server
    - `WEBSOCKET_HOST`: WebSocket host address for real-time communication
    - `WEBSOCKET_PORT`: WebSocket port for real-time communication
    - `SOCKET_HOST`: TCP socket host address for real-time communication with Python
    - `SOCKET_PORT`: TCP socket port for real-time communication with Python
    - `META_HOST`: Host address for the MT5 WEB API
    - `META_PORT`: Port number for the MT5 WEB API
    - `META_LOGIN`: Login ID for the MT5 WEB API
    - `META_PASSWORD`: Password for the MT5 WEB API login
    - `META_VERSION`: Version of the MT5 WEB API being used
    - `META_AGENT`: Agent for the MT5 WEB API connection

5. Start the services:
  - Python Backend:
    ```bash
    python main.py
    ```
  - Node.js Backend:
    ```bash
    npm start
    ```

## Author

#### Sky Option For IT Solutions
- Website: [skyoption.tech](https://skyoption.tech/)
- Email: info@skyoption.tech