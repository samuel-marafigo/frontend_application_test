
# Front-End Technical Test

This project is a technical test for a front-end position. It consists of a React application that fetches data from a JSON server and displays it. The application has been set up to run both with and without Docker.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (v16 or later)
- npm (v7 or later)
- Docker (optional, for running with Docker)

## Getting Started

### Running Without Docker

1. **Clone the repository:**
    ```sh
    git clone https://github.com/samuel-marafigo/frontend_application_test.git
    cd frontend_application_test
    ```

2. **Install dependencies:**
    ```sh
    npm install
    ```

3. **Start the JSON server:**
    ```sh
    npx json-server db.json --port 3000
    ```

4. **Start the React application:**
    ```sh
    npm run dev
    ```

5. **Open the application:**
    - Visit `http://localhost:5173` in your web browser.

### Running With Docker

1. **Clone the repository:**
    ```sh
    git clone https://github.com/samuel-marafigo/frontend_application_test.git
    cd frontend_application_test
    ```

2. **Build and run the Docker containers:**
    ```sh
    docker-compose up --build
    ```

3. **Open the application:**
    - Visit `http://localhost:5173` in your web browser.


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

