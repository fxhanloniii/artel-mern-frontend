import React from "react";
import './index.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { setUserToken, clearUserToken } from './utils/authToken';
import { useState } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState({})
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const registerUser = async (data) => {
    try {
      const configs = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    const newUser = await fetch(
      'http://localhost:4000/auth/signup',
      configs
    )
    const parsedUser = await newUser.json()

    setUserToken(parsedUser.token)

    setCurrentUser(parsedUser.currentUser)

    setIsAuthenticated(parsedUser.loggedIn)

    return parsedUser;
  } catch (err) {
    console.log(err)
    clearUserToken();
    setIsAuthenticated(false);
  }
}

const loginUser = async (data) => {
  try {
    const configs = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const response = await fetch(
      'http://localhost:4000/auth/login',
      configs
    )
    const user = await response.json()

    setUserToken(user.token)

    setCurrentUser(user.currentUser)

    setIsAuthenticated(user.loggedIn)

    return user
  } catch (err) {
    clearUserToken()
    setIsAuthenticated(false)
  }
}

  return (
    <div className="App">
      <Header user={currentUser} />
      <Main isLoggedIn={isAuthenticated} signup={registerUser} login={loginUser} user={currentUser}/>
      <Footer />
    </div>
  );
}

export default App;
