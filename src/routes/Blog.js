import { likeBlog, newComment, deleteBlog } from '../reducers/blogSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getAllUsers } from '../reducers/usersSlice';

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginUser = useSelector(state => state.user)

  const increaseLike = () => {
    const newBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    dispatch(likeBlog(blog.id, newBlog));
  };

  const submitComment = (event) => {
    event.preventDefault();
    const value = event.target.comment.value;

    if(!value) return;

    const comments = {
      "comments": value
    }

    dispatch(newComment(blog.id, comments));
    event.target.comment.value = '';
  }

  const handleDelete = async () => {
    let result = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (result) {
      await dispatch(deleteBlog(blog.id));
      dispatch(getAllUsers());
      navigate('/blogs')
    }
  };

  if(!blog) {
    return null;
  }
  return(
    <div>
      <h4 className="title">{blog.title}</h4>
      <p className="author">by <em>{blog.author}</em></p>
      <p><a href={blog.url}>{blog.url}</a></p>
      <span className="likes">{blog.likes} likes</span>
      <button type="button" className='btn btn-outline-primary ms-1' style={{ "lineHeight": 1, "padding": "3px" }} onClick={increaseLike}>
        <i className="bi bi-hand-thumbs-up-fill"></i>
      </button>
      <p>added by {blog.user.name}</p>
      {loginUser.username === blog.user.username && (
        <button className="delete-blog-btn btn" onClick={handleDelete}>
          delete blog
        </button>
      )}
      <h4>comments</h4>
      <form className="input-group mb-3" onSubmit={submitComment}>
        <input type="text" name="comment" className="form-control" placeholder='put your comment here'/>
        <button type="submit" className="btn btn-outline-secondary" >Post Comment</button>
      </form>
      {blog.comments && blog.comments.map((comment,index) =>
        <li key={`comment${index}`}>{comment}</li>
      )}
    </div>
  )
}

export default Blog;