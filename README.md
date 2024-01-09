## Map-app

## Tech Stack of implementation (frontend):

- Framework: React
- Build Tool: Vite
- Languages: JavaScript, TypeScript
- Node version: 16.14.0

## Tech Stack of implementation (backend):

- Server Environment: Node.js with Express
- Database: MongoDB
- Node version: 16.14.0

## Getting Started

To set up and run the app locally, follow these steps:

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/your-username/map-app.git
    cd map-app
    ```

2. Change to the `map-app-server` directory:

    ```bash
    cd map-app-server
    ```

3. Create a new `.env` file in the `map-app-server` directory to store your environment variables:

    ```bash
    touch .env
    ```

    Open the `.env` file in a text editor and configure the necessary environment variables:

    ```env
    mongodbURL=key
    ```

    Save and close the `.env` file.

4. Install the required Node.js packages for the server:

    ```bash
    npm install
    ```

5. Start the server in development mode:

    ```bash
    npm run dev
    ```

    In the console, you should see the message "Successful connected to mongoDB 🌿" and "App is listening on port: 3000 🚀".

6. Open a new tab in your terminal and navigate to the `map-app-client` directory:

    ```bash
    cd ../map-app-client
    ```

7. Install the required Node.js packages for the client:

    ```bash
    npm install
    ```

8. Start the client in development mode:

    ```bash
    npm run dev
    ```

9. Once the client is running, open your browser and navigate to [http://127.0.0.1:5173/](http://127.0.0.1:5173/) to view the application.

Congratulations! You have successfully set up and launched the Map App locally.
