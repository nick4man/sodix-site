# Sodix Website

This is the source code for the Sodix website, a modern and beautiful landing page built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design
- Animations
- Internationalization (English and Russian)
- Dark mode
- Back to top button
- Smooth scroll

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

-   `app`: The main application directory, containing the pages and layouts.
-   `components`: Reusable React components.
-   `dictionaries`: JSON files for internationalization.
-   `lib`: Helper functions and utilities.
-   `public`: Static assets like images and fonts.

## Scripts

-   `npm run dev`: Starts the development server.
-   `npm run build`: Builds the application for production.
-   `npm run start`: Starts the production server.
-   `npm run lint`: Lints the code.
-   `npm run docker:build`: Builds the Docker image.
-   `npm run docker:run`: Runs the Docker image.
-   `npm run docker:stop`: Stops the Docker container.
-   `npm run docker:prune`: Removes the Docker container.

## Docker

To build the Docker image, run:

```bash
npm run docker:build
```

To run the Docker container, run:

```bash
npm run docker:run
```

## Google Workspace Integration

There is a planned integration with Google Workspace to fetch project information for the portfolio section. The documentation for this can be found in `.gemini/GOOGLE_WORKSPACE_INTEGRATION.md`.