import React, { useState } from 'react';
import './App.css';
import Login from './Login';
import Items from './Items';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div>
      {!loggedIn ? <Login onLogin={handleLogin} /> : <Items />}
    </div>
  );
}


export default App;
