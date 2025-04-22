# News Forum

Welcome to the **News Forum** project! This repository contains the source code for a platform where users can share and discuss news and articles.

## Setup Guide

Follow these steps to set up the project for development:

1. **Clone the Repository**

   ```bash
   git clone git@github.com:RodOfDiscord/news-forum.git
   cd news-forum
   ```

2. **Install Dependencies for client and server-side**

   Ensure you have [Node.js](https://nodejs.org/) installed to run these commands:

   ```bash
   cd client
   npm install

   cd server
   npm install
   ```

3. **Environment Configuration**

   1. Create a `.env` file in the `server` folder
   2. Copy variables from the [.env.default](./server/.env.default)
   3. Fill in all variables
   4. Do the same steps in `client` folder. Default config file for client-side is [here](./client/.env.default)

4. **Development**

   From the project root, run both frontend and backend in development mode:

   ```bash
   cd server
   npm run dev

   cd client
   npm run dev
   ```

   Open your browser and navigate to `http://localhost:5173`.

## Documentation

### Backend

For backend`s documentation, visit the [server-side documentation](https://rodofdiscord.github.io/news-forum/).

### UI (Storybook)

To run storybook run these commands from the root:

```bash
cd client
npm run storybook
```

### Swagger

API documentation is available at `/api` page in the server-side

## Author

This project is developed and maintained by **[Ivan Palamarchuk](https://github.com/RodOfDiscord)**.

## Privacy Policy

Review Privacy Policy [here](./PRIVACY-POLICY.md)

## License

This project is licensed under the [MPL-2.0 License](./LICENSE).
