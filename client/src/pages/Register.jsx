import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import AddImage from '../images/addAvatar.png';
import axios from 'axios';
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [img, setImg] = useState(null);

  const [error, setError] = useState('');
  const navigate = useNavigate();

  //server image upload
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', img);
      const res = await axios.post('/uploads', formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      confirmPassword !== password ||
      password.length < 8 ||
      !email.includes('@')
    ) {
      setError('Paswords do not match or password is weak...');
      return;
    } else {
      const imgUrl = img ? await upload() : null;
      try {
        await Axios.post('/auth/register', {
          username,
          email,
          password,
          img: imgUrl,
        });
        navigate('/login');
      } catch (error) {
        setError(error.response.data);
      }
    }
  };

  return (
    <div className='auth'>
      <h1>Register</h1>
      <div className='bline' />
      <form>
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          type='email'
          placeholder='Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Password'
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type='password'
          placeholder='Confirm Password'
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <label
          htmlFor='file'
          style={{
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            color: '#777',
            fontWeight: '100',
            padding: '5px 0',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          <img src={AddImage} width={24} height={24} alt='' />
          Upload Profile Image
        </label>
        <input
          type='file'
          id='file'
          style={{ display: 'none' }}
          onChange={(e) => setImg(e.target.files[0])}
        />
        <button type='submit' className='btn' onClick={handleSubmit}>
          Register
        </button>
        {error && <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>}
      </form>
      <p>
        Already have an account? <Link to='/login'>Login here</Link>{' '}
      </p>
    </div>
  );
};

export default Register;
