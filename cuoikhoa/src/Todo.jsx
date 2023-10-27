import React, { useState, useEffect } from 'react';

const Todo = () => {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos');
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  const [todoText, setTodoText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(() => {
    const storedFilter = localStorage.getItem('selectedFilter');
    return storedFilter || 'ALL';
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('selectedFilter', selectedFilter);
  }, [selectedFilter]);

  const handleInputChange = (event) => {
    setTodoText(event.target.value);
  };

  const handleAddTodo = () => {
    if (todoText.trim() === '') {
      alert('Please enter a valid todo.');
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setTodoText('');
  };

  const handleToggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleDeleteAll = () => {
    setTodos([]);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredTodos = () => {
    if (selectedFilter === 'ACTIVE') {
      return todos.filter((todo) => !todo.completed);
    } else if (selectedFilter === 'COMPLETED') {
      return todos.filter((todo) => todo.completed);
    } else {
      return todos;
    }
  };

  return (
    <div>
      <h1>#todo</h1>
      <div className="container">
        <input
          type="text"
          value={todoText}
          onChange={handleInputChange}
          placeholder="Enter your task"
          className="placeholder"
        />
        <button className="add-button" onClick={handleAddTodo}>Add</button>
      </div>

      <div className="filters">
        <button onClick={() => handleFilterChange('ALL')}>ALL</button>
        <button onClick={() => handleFilterChange('ACTIVE')}>ACTIVE</button>
        <button onClick={() => handleFilterChange('COMPLETED')}>COMPLETED</button>
        <button className="delete-all-button" onClick={handleDeleteAll}>Delete All</button>
      </div>

      <div>
        <h2>{selectedFilter}</h2>
        <ul>
          {filteredTodos().map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggleComplete(todo.id)}
              />
              {todo.text}
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Todo;
