import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import AxiosService from '../../utils/Apiservice';


function BlogTile({ blog, showIcon }) {
    const [liked, setLiked] = useState(false);
    const [Blog, setBlog] = useState(blog);

    const toggleLikes = async (blogId) => {
        try {
            const likedValue = !liked;

            // Make the PUT request to toggle likes
            const res = await AxiosService.put(`/blog/${blogId}/${likedValue}`);

            // Update frontend state based on the response
            setBlog((prevBlog) => ({
                ...prevBlog,
                likes: res.data.likes, // Update likes count
            }));
            setLiked(likedValue); // Update liked state

        } catch (error) {
            console.log(error);
            // Handle errors, e.g., show an error message to the user
            res.status(500).send({
              message:"Internal servar error",
              error:error.message
           })
        }
    };
  
    return (
        <>
            {showIcon ? (<Card className='m-3'>
                <Card.Img variant='top' src={Blog.imageUrl} alt={`${Blog.title} image`} />
                <Card.Body>
                    <Card.Title>{Blog.title}</Card.Title>
                    <Card.Text>{Blog.description}</Card.Text>
                    <div>
                                {
                                liked ? (
                                    <FaHeart color='red' onClick={() => toggleLikes(Blog._id)} />
                                ) : (
                                    <FaRegHeart onClick={() => toggleLikes(Blog._id)} />
                                )}
                      
                      
                             <div>Total Likes: {Blog.likes}</div>
                    </div>
                </Card.Body>
            </Card>)
            :( <>
              <Card className='m-3'>
              <Card.Img variant="top" src={blog.imageUrl} alt={`${blog.title} image`}/>
              <Card.Body>
               <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.description}</Card.Text>
              </Card.Body>
              </Card>
              </> )
            }
        </>
    );
}

export default BlogTile;



