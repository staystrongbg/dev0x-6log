import { Link } from 'react-router-dom';
import { FC, useContext } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholder from '../images/placeholder.png';
import { isImgLink } from '../utils/isLink';
import { Post } from '../../interfaces/interfaces';
const Card: FC<{ post: Post }> = ({ post }) => {
  const isLink = isImgLink(post.img);

  const changeStyles = () => {
    switch (post.cat) {
      case 'javascript':
        return {
          backgroundColor: '#fed766',
          color: '#272727',
        };
      case 'design':
        return {
          backgroundColor: '#EE6352c1',
          color: '#f1f2f3',
        };
      case 'technology':
        return {
          backgroundColor: '#41D3BDc1',
          color: '#272727',
        };
      case 'typescript':
        return {
          backgroundColor: '#009fb7c1',
          color: '#f1f2f3',
        };
      case 'linux':
        return {
          backgroundColor: '#009fb7c1',
          color: '#f1f2f3',
        };
      default:
        return {
          backgroundColor: '#323232',
          color: '#f1f2f3',
        };
    }
  };
  return (
    <div className='post'>
      <span className='post-category' style={changeStyles()}>
        {post.cat}
      </span>
      <div className='post-img'>
        {/* <img src={post.img} loading='lazy' alt='' /> */}
        <img
          src={!isLink ? `../uploads/${post.img}` : post.img}
          loading='lazy'
          alt='image'
          className='intro-img'
        />
      </div>
      <div className='post-content'>
        <h1>{post.title}</h1>
        <div
          className='post-text-truncated'
          dangerouslySetInnerHTML={{ __html: post.desc }}
        />
        <Link to={`/post/${post.id}`}>
          <button>Read more</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
