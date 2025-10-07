import React, { useState } from 'react'
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from './store/api'

const App = () => {
  const { data: todos, error, isLoading, refetch } = useGetTodosQuery()
  const [addTodo, { isLoading: isAdding }] = useAddTodoMutation()
  const [deleteTodo, { isLoading: isDeleting }] = useDeleteTodoMutation()
  const [updateTodo] = useUpdateTodoMutation()
  const [newTodoTitle, setNewTodoTitle] = useState('')

  // ✅ Add new todo
  const handleAddTodo = async (e) => {
    e.preventDefault()
    if (newTodoTitle.trim()) {
      try {
        await addTodo({
          title: newTodoTitle,
          completed: false,
          userId: 1,
        }).unwrap()
        setNewTodoTitle('')
      } catch (err) {
        console.error('Failed to add todo:', err)
      }
    }
  }

  // ✅ Delete todo
  const handleDeleteTodo = async (id) => {
    try {
      await deleteTodo(id).unwrap()
    } catch (err) {
      console.error('Failed to delete todo:', err)
    }
  }

  // ✅ Toggle completed state
  const handleToggleCompleted = async (todo) => {
    try {
      await updateTodo({
        id: todo.id,
        completed: !todo.completed,
        title: todo.title,
        userId: todo.userId,
      }).unwrap()
    } catch (err) {
      console.error('Failed to update todo:', err)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            RTK Query & TailwindCSS Demo
          </h1>
          <p className="text-gray-600">
            Demonstrating RTK Query with caching, queries, and mutations
          </p>
        </header>

        {/* Add Todo */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Todo</h2>
          <form onSubmit={handleAddTodo} className="flex gap-2">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              placeholder="Enter a new todo..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isAdding}
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              disabled={isAdding || !newTodoTitle.trim()}
            >
              {isAdding ? 'Adding...' : 'Add Todo'}
            </button>
          </form>
        </div>

        {/* Todos List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Todos</h2>
            <button
              onClick={refetch}
              className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 text-sm"
              disabled={isLoading}
            >
              {isLoading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>

          {isLoading ? (
            <p className="text-center text-gray-600">Loading todos...</p>
          ) : error ? (
            <p className="text-center text-red-500">
              Error loading todos: {error.message || 'Unknown error'}
            </p>
          ) : todos && todos.length > 0 ? (
            todos.slice(0, 10).map((todo) => (
              <div
                key={todo.id}
                className={`flex items-center justify-between p-3 rounded-lg border ${
                  todo.completed
                    ? 'bg-green-50 border-green-200'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleToggleCompleted(todo)}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span
                    className={`ml-3 ${
                      todo.completed
                        ? 'line-through text-gray-500'
                        : 'text-gray-800'
                    }`}
                  >
                    {todo.title}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm disabled:opacity-50"
                  disabled={isDeleting}
                >
                  {isDeleting ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">
              No todos found. Add one above!
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
