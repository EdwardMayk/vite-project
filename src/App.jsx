import  { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Dashboard from './components/dashboard';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión exitoso
  const handleLogin = () => {
    setLoggedIn(true);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <div className="App" >
      {isLoggedIn ? (
        <Dashboard onLogout={handleLogout} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
