# Netflix-Like Platform

## Overview

This project is a study challenge to develop a web application for streaming movies, series, and documentaries, similar to platforms like Netflix. The aim is to emulate core features of modern streaming platforms by creating both the back-end and front-end within the same repository.

## Objectives

- Build a user-friendly platform for browsing, searching, and watching video content.
- Implement back-end APIs to manage users, content, and streaming functionalities.
- Develop a dynamic front-end with an intuitive interface for end users.

## Features

- **User Authentication:** Users can sign up, log in, and manage their profiles.
- **Content Catalog:** A library of movies, series, and documentaries with categories, genres, and search functionality.
- **Content Streaming:** Playback functionality for videos with adaptive quality.
- **Personalized Recommendations:** Suggest content based on user preferences (future goal).
- **Favorites and Watchlist:** Allow users to save content for later viewing.
- **Responsive Design:** Fully accessible on mobile, tablet, and desktop devices.

## Stack

- **Front-End:**

  - Framework: React (Next.js 14)
  - Styling: Tailwind CSS
  - State Management: Context API or Redux (to be determined)

- **Back-End:**
  - Framework: Node.js (Express.js or NestJS)
  - Database: PostgreSQL (Primary storage) and Redis (Cache)
  - Authentication: JSON Web Tokens (JWT)
  - Storage: AWS S3 or a similar solution for video and image assets

## Project Structure

The repository will include both the back-end and front-end code, organized as follows:

```
/project-root
  /client   # Front-end code
  /server   # Back-end code
  /shared   # Shared utilities and types (if needed)
```

## Goals and Challenges

- **Goal:** Deliver a functional prototype that demonstrates the primary features of a streaming platform.
- **Challenge:** Efficiently handle content streaming and optimize database queries for performance.

## Getting Started

### Prerequisites

- Node.js (v22+)
- PostgreSQL (v16+)
- Redis (optional for caching)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/LatinSoftware/Netflix-Like-Platform.git
   ```
2. Install dependencies for the front-end and back-end:

   ```bash
   cd apps/client
   pnpm install

   cd ../server
   pnpm install
   ```

3. Set up environment variables for both the client and server (e.g., database connection, API keys, etc.).

### Running the Project

1. Start the back-end server:
   ```bash
   pnpm start:server
   ```
2. Start the front-end development server:
   ```bash
   pnpm start:client
   ```
3. Access the application server at `http://localhost:3000`.

4. Access the application client at `http://localhost:5173`

## Contribution

This project is for educational purposes. Contributions are welcome to enhance features or improve code quality.

## License

This project is licensed under the MIT License.
