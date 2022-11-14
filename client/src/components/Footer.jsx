import { Link } from 'react-router-dom';
import { links } from '../utils/links';
const Footer = () => {
  return (
    <footer>
      <div className='logo'>
        <h2>DevoxBlog</h2>
      </div>
      <div className='links'>
        {links.map((l) => (
          <Link to={l.href} key={l.id}>
            <h6
              onMouseOver={(e) => {
                e.target.style = `color:#${l.color}`;
              }}
              onMouseOut={(e) => {
                e.target.style = 'color:#f1f2f3';
              }}
            >
              {l.text}
            </h6>
          </Link>
        ))}
      </div>
      <p>Copyright Devox 2022&copy;</p>
    </footer>
  );
};

export default Footer;
