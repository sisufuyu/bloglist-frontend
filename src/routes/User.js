import { ListGroup } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const User = () => {
  const users = useSelector(state => state.users)
  const id = useParams().id
  const user = users.find(u => u.id === id)

  if (!user) {
    return null
  }

  return (
    <div>
      <h5>{user.name} added blogs</h5>
      <ListGroup>
        {user.blogs.map(blog =>
          <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>)}
      </ListGroup>
    </div>
  )
}

export default User;