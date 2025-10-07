import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define our API service
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'http://localhost:3001/', // Updated to match JSON Server port
  }),
  tagTypes: ['Todos'], // Define tag types for caching and invalidation
  endpoints: (builder) => ({
    // Query endpoint for fetching todos
    getTodos: builder.query({
      query: () => 'todos',
      providesTags: (result, error, arg) => {
        if (result && Array.isArray(result)) {
          return [
            ...result.map(({ id }) => ({ type: 'Todos', id })),
            { type: 'Todos', id: 'LIST' },
          ];
        } else {
          return [{ type: 'Todos', id: 'LIST' }];
        }
      },
    }),
    
    // Query endpoint for fetching a single todo
    getTodoById: builder.query({
      query: (id) => `todos/${id}`,
      providesTags: (result, error, id) => [{ type: 'Todos', id }],
    }),
    
    // Mutation endpoint for adding a new todo
    addTodo: builder.mutation({
      query: (newTodo) => ({
        url: 'todos',
        method: 'POST',
        body: newTodo,
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
    
    // Mutation endpoint for updating a todo
    updateTodo: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Todos', id }],
    }),
    
    // Mutation endpoint for deleting a todo
    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Todos', id: 'LIST' }],
    }),
  }),
})

// Export hooks for usage in functional components
export const { 
  useGetTodosQuery,
  useGetTodoByIdQuery,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
} = api