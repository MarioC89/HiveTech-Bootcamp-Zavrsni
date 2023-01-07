import React, { useState, useEffect } from 'react';

import styles from "../ToDo/ToDo.module.css"

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem(isLoggedIn, false);
    window.location.reload();
  };

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos');
        const data = await response.json();
        setTodos(data.slice(0, 10));
      } catch (error) {
        console.error(error);
      }
    };
    fetchTodos();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newTodo = {
      id: todos.length + 1,
      title: event.target.elements.title.value,
      completed: false,
    };
    setTodos([...todos, newTodo]);
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Unos novog to do" />
        <button type="submit" className={styles.add}>Dodaj</button>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <p>{todo.title}</p>
            <p>{todo.completed ? 'Izvršeno' : 'Nije izvršeno'}</p>
            <button onClick={() => handleDelete(todo.id)} className={styles.delete}>Obriši</button>
          </li>
        ))}
      </ul>
      <button className={styles.logout} onClick={handleLogout}>
          Log Out
        </button>
    </>
  );
};

export default TodoList;