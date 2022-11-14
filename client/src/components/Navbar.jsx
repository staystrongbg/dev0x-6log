import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import User from '../images/user.png';
import { links } from '../utils';
import { useContext } from 'react';
import { AuthContext } from '../authContext';

const Navbar = () => {
  const [responsiveNav, setResponsiveNav] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // localstyles()
  const styles = (bg = 'transparent', color = '#272727') => {
    return {
      backgroundColor: `#${bg}`,
      color: `#${color}`,
      height: '100%',
      display: 'flex',
      padding: '0 40px',
      alignItems: 'center',
      justifyContent: 'center',
    };
  };

  const WRITE_STYLE = {
    backgroundColor: '#791E94c1',
    color: '#f1f2f3',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 40px',
  };
  console.log(currentUser);
  return (
    <nav className={` fix-pos dropIn `}>
      <div className='logo'>
        <Link to='/'>
          <h2 className='text-gradient'>DevoxBlog</h2>
        </Link>
      </div>
      <div className='links'>
        {links.map((l) => (
          <Link to={l.href} key={l.id} style={styles(l.color, l?.textColor)}>
            <h6> {l.text}</h6>
          </Link>
        ))}
        {currentUser && (
          <Link to='/write' style={WRITE_STYLE}>
            <h6>write</h6>
          </Link>
        )}
      </div>
      <div className='user'>
        <img src={`../uploads/${currentUser?.img}` || User} alt='user' />
        <div>
          <span>{currentUser?.username}</span>
          {currentUser ? (
            <span
              onClick={async () =>
                await logout(currentUser).then(navigate('/login'))
              }
            >
              Logout
            </span>
          ) : (
            <span>
              <Link to='/login' style={{ color: '#f1f2f3' }}>
                Login
              </Link>
            </span>
          )}
        </div>
      </div>
      <motion.div
        whileHover={{ scale: 1.5 }}
        className='hamburger'
        onClick={() => {
          setResponsiveNav(!responsiveNav);
        }}
      >
        &equiv;
      </motion.div>
      <div
        className={`links-responsive ${
          responsiveNav ? 'flex' : 'hidden'
        } dropIn `}
      >
        <h2>DevoxBlog</h2>
        {links.map((l) => (
          <Link key={l.id} to={l.href} onClick={() => setResponsiveNav(false)}>
            <h6
              style={{
                color: `#${l.color}`,
              }}
            >
              {l.text}
            </h6>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
