import React, { useState, useEffect } from 'react';
import LoginForm from "./components/login/LoginForm";
import TodoList from "./components/ToDo/ToDo-list";

import styles from "./App.module.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  useEffect(() => {
       setIsLoggedIn(localStorage.getItem("isLoggedIn"));
     }, [isLoggedIn]);
     
  return (
    <>
      <div className={styles.container}>
        {isLoggedIn ? (
          <LoginForm onLogin={handleLogin} />
        ) : (
          <TodoList />
        )}
      </div>
    </>
  );
}

export default App;
