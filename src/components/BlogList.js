import { useSelector } from "react-redux";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

const BlogList = ({ user }) => {
  const sortFun = (b1, b2) => b2.likes - b1.likes
  const blogs = useSelector(state => {
    return [...state.blog].sort(sortFun)
  })

  return(
    <div>
      <ListGroup>
        {blogs.map(blog =>
          <ListGroup.Item key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroup.Item>
        )}
      </ListGroup>
    </div>
  )
}

export default BlogList;
