import React, {useState} from 'react';
import { useForm } from 'react-hook-form';

import "../login/LoginForm.module.css";

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin();
  };

  const {
    register,
    formState: { errors }
  } = useForm();

  /* const onSubmit = (data) => {
    console.log(data);
    localStorage.setItem('user', JSON.stringify(data));
  }; */

  

  return (
    <div className="formContainer">
      <form onSubmit={handleSubmit}>
        <div className="form-control">
          <label>Email</label>
          <input
            type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                message: "Email is not valid."
              }
            })}
          />
          {errors.email && <p className="errorMsg">{errors.email.message}</p>}
        </div>
        <div className="form-control">
          <label>Password</label>
          <input
            type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)}
            {...register("password", {
              required: true,
              validate: {
                checkLength: (value) => value.length >= 6,
                matchPattern: (value) =>/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s)/.test(value)
              }
            })}
          />
          {errors.password?.type === "required" && (
            <p className="errorMsg">Password is required.</p>
          )}
          {errors.password?.type === "checkLength" && (
            <p className="errorMsg">
              Password should be at-least 6 characters.
            </p>
          )}
          {errors.password?.type === "matchPattern" && (
            <p className="errorMsg">
              Password should contain at least one uppercase letter, lowercase
              letter, digit.
            </p>
          )}
        </div>
        <div className="form-control">
          <label></label>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};