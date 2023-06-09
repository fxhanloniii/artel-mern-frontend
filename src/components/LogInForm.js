import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


const LogInForm = ({ login }) => {
    const initialState = { username: '', password: ''};
    const [input, setInput] = useState(initialState);
    const [errRes, SetErrRes] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
      const createdUserToken = await login(input);
    
      if (createdUserToken) {
        navigate(`/user/profile/${input.username}`);
      } else {
        SetErrRes('Invalid Username or Password');
        setInput(initialState);
        navigate('/login');
      }
    };

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

  return (
    <>
    <h1 className='error'>{errRes}</h1>
    <div className="form">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username: </label>
        <input
          id="username"
          name="username"
          value={input.username}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          id="password"
          name="password"
          type="password"
          value={input.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />
        <input className="submit bg-gradient-to-r from-blue-500 to-purple-500" type="submit" value="Login" />
      </form>
    </div>
    </>
  )
}

export default LogInForm
