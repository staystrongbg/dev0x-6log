import { ChangeEvent, FC, FormEvent, useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

const Login: FC = () => {
  const [inputs, setInputs] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      login(inputs);
      navigate('/');
    } catch (error: any) {
      setError(error.response.data);
    }
  };

  return (
    <div className='auth'>
      <h1>Login</h1>
      <div className='bline' />
      <form>
        <input
          type='text'
          placeholder='Username'
          name='username'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          onChange={handleChange}
        />
        <button type='submit' className='btn' onClick={handleLogin}>
          Login
        </button>
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      </form>
      <p>
        Don't have an account? <Link to='/register'>Register here</Link>{' '}
      </p>
    </div>
  );
};

export default Login;
