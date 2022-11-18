import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { Post } from '../../interfaces/interfaces';
import Card from '../components/Card';

const Home: FC = () => {
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    axios
      .get<Post[]>('http://localhost:8000/api/posts')
      .then((res) => setPosts(res.data))
      .catch((err) => setError(err.message));
  }, []);
  return (
    <div className='home '>
      <div className='posts'>
        {error && <p>{error}</p>}
        {posts && posts.map((p, idx) => <Card post={p} key={idx} />)}
        {posts.length === 0 && (
          <h1 style={{ color: '#f1f2f3a0' }}> No posts in this category</h1>
        )}
      </div>
    </div>
  );
};

export default Home;
