import React, { useState, useEffect } from 'react';
import LoginForm from "./components/login/LoginForm";
import TodoList from "./components/ToDo/ToDo-list";

import styles from "./App.module.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
  };

  useEffect(() => {
       setIsLoggedIn(localStorage.getItem("isLoggedIn"));
     }, [isLoggedIn]);
     
  return (
    <>
      <div className={styles.container}>
        {!isLoggedIn ? (
          <LoginForm onSubmit={handleLogin}/>
        ) : (
          <TodoList />
        )}
      </div>
    </>
  );
}

export default App;
