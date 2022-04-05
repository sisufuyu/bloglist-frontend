import Togglable from '../components/Togglable'
import CreateBlog from '../components/CreateBlog'
import BlogList from '../components/BlogList'
import { useRef } from 'react'
import { setNotification, clearNotification } from '../reducers/notificationSlice'
import { addBlog } from "../reducers/blogSlice";
import { useDispatch } from 'react-redux';
import { getAllUsers } from '../reducers/usersSlice'

const Blogs = ({ userId }) => {
  const createBlogRef = useRef();
  const dispatch = useDispatch();

  const handleCreateBlog = async (newBlog) => {
    createBlogRef.current.toggleVisibility();
    await dispatch(addBlog(newBlog));
    dispatch(setNotification(`a new blog ${newBlog.title} by ${newBlog.author}`));
    dispatch(clearNotification(5000));
    dispatch(getAllUsers());
  };

  return(
    <div>
      <Togglable buttonLabel="New Blog" ref={createBlogRef}>
        <CreateBlog handleCreateBlog={handleCreateBlog}/>
      </Togglable>
      <BlogList/>
    </div>
  )
}

export default Blogs;