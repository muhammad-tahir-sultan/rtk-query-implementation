# React Hooks, and Redux Toolkit Query Practice Project

This project is designed to help practice React hooks, and Redux Toolkit Query (RTK Query) concepts in a practical todo application.

## Features

1. **React Hooks Practice**:
   - useState for managing local component state


3. **Redux Toolkit**:
   - Redux store configuration
   - Slice reducers for todos 
   - State management best practices

4. **RTK Query**:
   - API service configuration with base URL
   - Query endpoints for data fetching
   - Mutation endpoints for data manipulation
   - Caching and automatic refetching


5. **TailwindCSS**:
   - Utility-first CSS framework
   - Responsive design
   - Custom component styling

6. **JSON Server**:
   - Local mock REST API
   - Data persistence
   - CRUD operations simulation

## Project Structure

```
src/
├── store/
│   ├── api.js              # RTK Query API service
│   └── store.js            # Redux store configuration
├── App.jsx                 # Main application component
├── main.jsx                # Application entry point
├── index.css               # Global styles (Tailwind directives)
└── assets/
    └── react.svg           # React logo asset
```

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Start the JSON Server (mock API):
   ```
   npm run server
   ```

3. In a new terminal, start the development server:
   ```
   npm run dev
   ```

## Learning Concepts

### React Hooks
- `useState`: Manage component state (LoginForm, TodoList)


### Redux Toolkit
- `createSlice`: Define reducers and actions
- `configureStore`: Configure Redux store with slices

### RTK Query
- `createApi`: Define API service
- Query endpoints: Fetch data with automatic caching
- Mutation endpoints: Modify data with automatic cache invalidation
- Tag-based caching and invalidation

### TailwindCSS
- Utility classes for rapid UI development
- Responsive design utilities
- Custom styling with minimal CSS

### JSON Server
- RESTful API mocking
- Data persistence in JSON format
- CRUD operations support


## Available Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run preview`: Preview production build
- `npm run server`: Start JSON Server mock API
- `npm run lint`: Run ESLint

## API Endpoints

The project uses JSON Server as a mock API with the following endpoints:

- `GET /todos` - Fetch all todos
- `GET /todos/:id` - Fetch a specific todo
- `POST /todos` - Create a new todo
- `PUT /todos/:id` - Update a todo
- `DELETE /todos/:id` - Delete a todo

The API runs on `http://localhost:3001` by default.