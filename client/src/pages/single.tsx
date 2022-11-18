import { FC, useContext, useEffect, useState } from 'react';
import Menu from '../components/Menu';
import Edit from '../components/svg/Edit';
import Delete from '../components/svg/Delete';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import placeholder from '../images/placeholder.png';
import { isImgLink } from '../utils/isLink';
import { Post } from '../../interfaces/interfaces';
import { AuthContext } from '../context/authContext';
const Single: FC = () => {
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get<Post>(
          `http://localhost:8000/api/posts/${id}`
        );
        setPost(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  const isLink = post?.img ? isImgLink(post.img) : false;

  const handleDelete = async () => {
    try {
      await axios.delete(`/posts/${id}`);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };
  console.log(post);
  return (
    <div className='single-post'>
      {loading && <h2>Loading...</h2>}
      {post && (
        <div className='content'>
          <img
            src={isLink ? post?.img : `../uploads/${post.img}`}
            alt=''
            loading='lazy'
            width='100%'
          />
          <div className='user'>
            <img src={post?.users.img} alt='' />

            <div className='info'>
              <span>{post?.users.username}</span>
              <p>{moment(post.date).fromNow()}</p>
            </div>
            {currentUser?.username === post.users.username && (
              <div className='controls'>
                <Link to={`/write?edit=${post.id}`} state={post}>
                  <Edit />
                </Link>
                <Delete onClick={handleDelete} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post?.desc }} />
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
        {/* <Menu cat={post.cat} key={post.id} /> */}
      </div>
    </div>
  );
};

export default Single;
