# Express API

## Overview

This is an Express-based API starter template for your final project. It is designed with a modular structure to ensure scalability and maintainability.

## Getting Started

### Installation

1. Navigate to the `api` directory:
   ```bash
   cd api
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm start
```

This will start the server at `http://localhost:3000`.

## Project Structure

```
api/
├── index.js               # Entry point for the API
├── src/
│   ├── controllers/       # Handles HTTP requests and responses
│   │   └── example.controller.js
│   ├── services/          # Contains business logic
│   │   └── example.service.js
│   ├── repositories/      # Handles database interactions
│   │   └── example.repository.js
│   ├── routes/            # Defines API routes
│   │   ├── example.routes.js
│   │   └── index.js
│   └── middlewares/       # Custom middleware functions
└── package.json           # Project metadata and dependencies
```

## Key Features

### Modular Architecture

- **Controllers**: Handle HTTP requests and responses. Delegate business logic to services.
- **Services**: Contain business logic and orchestrate calls to repositories.
- **Repositories**: Handle database queries and external data interactions.
- **Middlewares**: Custom middleware functions for tasks like authentication, logging, and error handling.

### Example Implementation

#### Example Route

- **Path**: `/api/example`
- **Method**: `GET`
- **Response**:
  ```json
  {
    "message": "Example response",
    "data": {
      "key": "value from database",
      "additionalKey": "additional value"
    }
  }
  ```

### Adding Middleware

Middleware functions are used to process requests before they reach the route handlers. For example, you can create an authentication middleware to protect certain endpoints.

#### Example Middleware

Create a new file in `src/middlewares/auth.middleware.js`:

```javascript
export const authMiddleware = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Example: Validate the token (this is just a placeholder)
  if (token !== 'valid-token') {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
};
```

#### Using Middleware

To use the middleware, import it in your route file and apply it to specific routes:

```javascript
import { Router } from 'express';
import { getExample } from '../controllers/example.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authMiddleware, getExample);

export default router;
```

## Best Practices

- **Keep Controllers Thin**: Delegate all business logic to services.
- **Use Environment Variables**: Store sensitive data like API keys in `.env` files.
- **Write Tests**: Add unit and integration tests for critical functionality.
- **Document APIs**: Use tools like Swagger or Postman to document your API endpoints.
- **Error Handling**: Use middleware to handle errors consistently across the application.

## Resources

- [Express Documentation](https://expressjs.com/)
- [Node.js Documentation](https://nodejs.org/)
- [REST API Design Guidelines](https://restfulapi.net/)

## Customization Ideas

- Add a database connection (e.g., MongoDB, PostgreSQL).
- Implement authentication (e.g., JWT, OAuth).
- Add request validation using libraries like `express-validator`.
- Set up logging with `winston` or `morgan`.
- Add error handling middleware for consistent error responses.
