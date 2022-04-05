import { Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Users = () => {
  const users = useSelector(state => state.users)

  return(
    <div>
      <h2>Users</h2>
      <Table striped bordered>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </thead>
      </Table>
    </div>
  )
}

export default Users;