import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholder from '../images/placeholder.png';
const Menu = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get(`/posts/?cat=${cat}`)
  //     .then((res) => setPosts(res.data))
  //     .catch((err) => console.log(err));
  // }, [cat]);
  return <div className='menu'>menu</div>;
};

export default Menu;
