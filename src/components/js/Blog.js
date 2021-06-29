import { Route, Link, BrowserRouter } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Blog() {
  const [blog, setblog] = useState([]);
  const [newblog, setnewblog] = useState('');
  const [update, setupdate] = useState(false);
  const [deletebtn, setdeletebtn] = useState(false);
  const [files, setfiles] = useState('');
  let fileurl = '';

  const upload = () => {
    const data = new FormData();
    data.append('files', files, files.name);
    axios
      .post(
        `http://127.0.0.1:8000/upload/${localStorage.getItem('usertoken')}`,
        data
      )
      .then((responce) => {
        fileurl = 'http://127.0.0.1:8000' + responce.data.fileurl;
        console.log(fileurl);
        setfiles(fileurl);
      });
  };
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
        <input
          type="file"
          name="files"
          onChange={(e) =>
            e.target.files[0] !== undefined || null
              ? setfiles(e.target.files[0])
              : setfiles(null)
          }
        />

        <button type="submit" onClick={upload}>
          upload file
        </button>
        <button
          onClick={() => {
            localStorage.removeItem('usertoken');
            window.location.replace('/');
          }}
        >
          Signout
        </button>
        <img src={fileurl} width="500" height="600" />
      </div>
    </div>
  );
}
export default Blog;
