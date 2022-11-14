import { Link } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { PostContext } from '../postContext';
import { useContext } from 'react';
import 'react-lazy-load-image-component/src/effects/blur.css';
import placeholder from '../images/placeholder.png';
const CardTransparent = ({ post }) => {
  const { isImgLink } = useContext(PostContext);

  function createMarkup() {
    const text = post.desc;
    return { __html: text };
  }
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
        <LazyLoadImage
          placeholderSrc={placeholder}
          src={!isLink ? `../uploads/${post.img}` : post.img}
          loading='lazy'
          alt='image'
          effect='blur'
          className='intro-img'
        />
      </div>
      <div className='post-content'>
        <h1>{post.title}</h1>
        <div
          className='post-text-truncated'
          dangerouslySetInnerHTML={createMarkup()}
        />
        <Link to={`/post/${post.id}`}>
          <button>Read more</button>
        </Link>
      </div>
    </div>
  );
};

export default CardTransparent;
