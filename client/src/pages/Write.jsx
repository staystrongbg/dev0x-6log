import { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { links } from '../utils';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [desc, setDesc] = useState(state ? state.desc : '');
  const [title, setTitle] = useState(state ? state.title : '');
  const [img, setImg] = useState(state ? state.img : '');

  const [imgLink, setImgLink] = useState(false);
  const [category, setCategory] = useState('');
  const [error] = useState(null);
  const [file, setFile] = useState(null);

  useEffect(() => {
    setCategory(state?.cat);
  }, [state?.cat]);
  //server image upload
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await axios.post('/uploads', formData);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const imgUrl = file ? await upload() : null;
    state
      ? //if its update post then axios.put
        axios
          .put(`/posts/${state.id}`, {
            title,
            desc,
            img: file ? imgUrl : img,
            category,
          })
          .then(navigate('/'))
          .catch((err) => console.log(err))
      : //if its a new post then its axios.post
        axios
          .post('/posts/', {
            title,
            desc,
            img: file ? imgUrl : img,
            category,
            date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
          })
          .then(navigate('/'))
          .catch((err) => console.log(err));
  };

  return (
    <div className='write-container'>
      <div className='write-post'>
        <div className='post-content'>
          <input
            type='text'
            placeholder='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className='editor-container'>
            <ReactQuill
              className='editor'
              theme='snow'
              value={desc}
              onChange={setDesc}
            />
            {error && <p>{error}</p>}
          </div>
        </div>
        <div className='options'>
          <div className='publish'>
            <h2>Publish</h2>
            <span>
              <b>Status:</b> Draft
            </span>
            <span>
              <b>Visibility:</b> Public
            </span>
            <label htmlFor='file'>Upload a file</label> <span>or</span>{' '}
            <input
              type='file'
              id='file'
              style={{ display: 'none' }}
              onChange={(e) => setFile(e.target.files[0])}
            />
            {imgLink && (
              <input
                id='imgLink'
                type='text'
                value={img}
                placeholder='Image link'
                onChange={(e) => {
                  setImg(e.target.value);
                }}
              />
            )}
            <label htmlFor='imgLink' onClick={() => setImgLink(!imgLink)}>
              Add image link
            </label>
            <div className='buttons'>
              <button>Save as a draft</button>
              <button onClick={handleUpdate}>
                {state ? 'Update' : ' Create '}
              </button>
            </div>
          </div>
          <div className='categories'>
            <h2>Category</h2>
            {links.map((link) => (
              <div key={link.id}>
                <input
                  type='radio'
                  name='cat'
                  value={link.text}
                  id={link.text}
                  checked={category === link.text}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <label htmlFor={link.text}>{link.text}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Write;
