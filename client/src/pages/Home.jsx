import { useEffect } from 'react';
import { useState } from 'react';
import Card from '../components/CardTransparent';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
const Home = () => {
  const [error] = useState(null);
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;
  useEffect(() => {
    axios
      .get(`/posts${cat}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [cat]);
  return (
    <div className='home '>
      <div className='posts'>
        {error && <p>{error}</p>}
        {posts && posts.map((post) => <Card post={post} key={post.id} />)}
        {posts.length === 0 && (
          <h1 style={{ color: '#f1f2f3a0' }}> No posts in this category</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
