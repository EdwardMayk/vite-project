import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login exitoso, puedes manejar el estado de autenticación aquí
        toast.success('Inicio de sesión exitoso', {
          position: toast.POSITION.TOP_LEFT,
        });
        console.log('Login successful');

        // Llama a la función proporcionada por la prop onLogin
        if (onLogin) {
          onLogin();
        }
      } else {
        // Login fallido, muestra un mensaje de error
        console.error('Login failed:', data.message);
        toast.error('Credenciales incorrectas', {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      // Muestra una notificación de error genérica si hay un error en la solicitud
      toast.error('Ocurrió un error durante el inicio de sesión', {
        position: toast.POSITION.TOP_LEFT,
      });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Iniciar sesión</h2>
      <Form onSubmit={handleLogin}>
        <Form.Group controlId="formUsername">
          <Form.Label>Usuario:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa tu usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-4">
          <Form.Label>Contraseña:</Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingresa tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Iniciar sesión
        </Button>
      </Form>

      <ToastContainer />
    </div>
  );
};

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};


export default Login;
