import { useContext, useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Edit from '../components/svg/Edit';
import Delete from '../components/svg/Delete';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { PostContext } from '../postContext';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import placeholder from '../images/placeholder.png';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Single = () => {
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { isImgLink } = useContext(PostContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  function createMarkup() {
    return { __html: post.desc };
  }
  const isLink = post.img ? isImgLink(post.img) : false;

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='single-post'>
      {loading && <h2>Loading...</h2>}
      {post && (
        <div className='content'>
          <LazyLoadImage
            placeholderSrc={placeholder}
            src={isLink ? post?.img : `../uploads/${post.img}`}
            alt=''
            loading='lazy'
            effect='blur'
            width='100%'
          />
          <div className='user'>
            <img src={post?.userImg} alt='' />

            <div className='info'>
              <span>{post.username}</span>
              <p>{moment(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.username && (
              <div className='controls'>
                <Link to={`/write?edit=${post.id}`} state={post}>
                  <Edit />
                </Link>
                <Delete onClick={handleDelete} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <p dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}

      <div className='menu-container'>
        <h3>Other posts you may like</h3>
        <div
          style={{
            height: '4px',
            backgroundImage:
              'linear-gradient( 126.3deg,  rgba(30,2,83,1) 32.2%, rgba(198,55,160,0.46) 109.2% )',
          }}
        />
        <Menu cat={post.cat} key={post.id} />
      </div>
    </div>
  );
};

export default Single;
