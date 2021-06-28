import { Route, Link, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
  const [blog, setblog] = useState([]);
  const [newblog, setnewblog] = useState('');
  const [update, setupdate] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/blogdisp/${localStorage.getItem('usertoken')}`
      )
      .then((responce) => {
        setblog(responce.data.blog);
      });
  }, [update]);
  return (
    <div>
      <div>
        {blog.map((x) => {
          return (
            <h1>
              {x}
              <button>delete</button>
            </h1>
          );
        })}
      </div>
      <div>
        <textarea
          onChange={(e) => setnewblog(e.target.value)}
          placeholder="enter your blog here"
        ></textarea>
        <button
          onClick={() => {
            axios
              .post('http://127.0.0.1:8000/upload/', {
                blog: newblog,
                userid: localStorage.getItem('usertoken'),
              })
              .then((responce) => {
                if (responce) {
                  setupdate(!update);
                }
              });
          }}
        >
          Upload
        </button>
      </div>
    </div>
  );
}
export default Blog;
