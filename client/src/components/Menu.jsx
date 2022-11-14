import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { PostContext } from '../postContext';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholder from '../images/placeholder.png';
const Menu = ({ cat }) => {
  const { isImgLink } = useContext(PostContext);

  function createMarkup(post) {
    const text = post.desc.slice(0, 60);
    return { __html: text };
  }
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    axios
      .get(`/posts/?cat=${cat}`)
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  }, [cat]);
  return (
    <div className='menu'>
      {posts
        .filter((p) => p.id !== +id)
        .map((post) => {
          const isLink = isImgLink(post.img);
          return (
            <div key={post.id}>
              <h5>{post.data}</h5>
              <LazyLoadImage
                placeholderSrc={placeholder}
                src={!isLink ? `../uploads/${post.img}` : post.img}
                loading='lazy'
                alt='image'
                effect='blur'
                className='intro-img'
              />
              <h3>{post.title}</h3>
              <div dangerouslySetInnerHTML={createMarkup(post)} />
              <Link to={`/post/${post.id}`}>
                <button>Read More</button>
              </Link>
            </div>
          );
        })}
    </div>
  );
};

export default Menu;
