/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

import styles from "../login/LoginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", true);
    window.location.reload();
  };

  const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data));
    handleLogin();
  };

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.form.control}>
          <label>Email</label>
          <input name='email'
            type="email" id="email" onChange={(e) => setEmail(e.target.value)}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
          />
          {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
        </div>
        <div className={styles.form.control}>
          <label>Password</label>
          <input
            type="password" id="password" onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value)
              }
            })}
          />
          {errors.password?.type === "required" && (
            <p className={styles.errorMsg}>Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className={styles.errorMsg}>
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className={styles.errorMsg}>
              Password should contain at least one uppercase letter, lowercase
              letter, digit.
            </p>
          )}
        </div>
        <div className={styles.form.control}>
          <label></label>
          <button type="submit" className={styles.login} >Login</button>
        </div>
      </form>
    </div>
  );
};