import React, { useEffect, useState } from 'react';
import BlogTile from './common/BlogTile';
import AxiosService from '../utils/Apiservice';
import useLogout from '../Hooks/useLogout';
import { toast } from 'react-toastify';
import Spinner from 'react-bootstrap/Spinner'; // Import Spinner component

function Home() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const logout = useLogout();

  const getBlogs = async () => {
    try {
       setLoading(true);
      let res = await AxiosService.get('/dashboard');
      if (res.status === 200) {
        setBlogs(res.data.blogs);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      if (error.response.status === 401) {
        logout();
      }
    } finally {
      setLoading(false); // Set loading to false once the data retrieval is complete (whether successful or not)
    }
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <div className='container' style={{ height: '100vh', marginTop: '10px' }}>
      <div className='d-flex justify-content-center' style={{ height: '100%' }}>
        <div className='container-fluid' style={{ maxWidth: '500px' }}>
          <h2 className='text-center '>Welcome🙏 to Our Blog Hub</h2>
          <hr />
          {
                  loading ? ( // Render spinner if loading is true
                  <div className='text-center'>
                  <Spinner animation='border' role='status'>
                  <span className='visually-hidden'>Loading...</span>
                  </Spinner>
                  </div>
            ) : (
                  // Render blogs if loading is false
                  <div className='blog-wrapper'>
                  { 
                  blogs.map((blog) => {
                  return <BlogTile blog={blog} key={blog._id}  showIcon={true}/>;
                  })
                  }
                  </div>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Home;
