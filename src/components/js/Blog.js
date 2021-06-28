import { Route, Link, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
  const [blog, setblog] = useState([]);
  const [newblog, setnewblog] = useState('');
  const [update, setupdate] = useState(false);
  const [deletebtn, setdeletebtn] = useState(false);
  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/blogdisp/${localStorage.getItem('usertoken')}`
      )
      .then((responce) => {
        setblog(responce.data.blog);
        console.log(blog);
      });
  }, [update, deletebtn]);
  return (
    <div>
      <div>
        {blog.map((x) => {
          return (
            <h1>
              {x[0]}
              <button
                onClick={() => {
                  axios
                    .delete('http://127.0.0.1:8000/delete/', {
                      headers: {
                        Authorization: localStorage.getItem('usertoken'),
                      },
                      data: {
                        id: x[1],
                      },
                    })
                    .then((response) => {
                      if (response.data.status) {
                        setdeletebtn(!false);
                      }
                    });
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  const newblogupdate = prompt(
                    'what are you going to update with'
                  );
                  axios.put('http://127.0.0.1:8000/update/', {
                    blog: newblogupdate,
                    id: x[1],
                  });
                }}
              >
                update
              </button>
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
        <button
          onClick={() => {
            localStorage.removeItem('usertoken');
            window.location.replace('/');
          }}
        >
          Signout
        </button>
      </div>
    </div>
  );
}
export default Blog;
