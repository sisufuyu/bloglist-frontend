import { useEffect } from "react";
import blogService from "./services/blogs";
import Notification from "./components/Notification";
import { setUser } from "./reducers/userSlice";
import { getAllUsers } from "./reducers/usersSlice";
import { initializeBlog } from "./reducers/blogSlice";
import { useSelector, useDispatch } from "react-redux";
import { Routes, Route, useNavigate, useMatch, Navigate, Link } from "react-router-dom";
import Users from './routes/Users';
import User from './routes/User';
import Login from './routes/Login';
import Blogs from "./routes/Blogs";
import Blog from './routes/Blog';
import Home from './routes/Home';
import { Navbar, Nav, Button } from "react-bootstrap";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const blogAppUser = window.localStorage.getItem("blogAppUser");
    if (blogAppUser) {
      const user = JSON.parse(blogAppUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    dispatch(initializeBlog());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const loginUser = useSelector(state => state.user);
  const blogs = useSelector(state => state.blog);

  const handleLogout = () => {
    window.localStorage.removeItem("blogAppUser");
    dispatch(setUser(null))
    navigate('/login')
  };

  const match1 = useMatch('/blogs/:id')
  const blog = match1 ? blogs.find(blog => blog.id === String(match1.params.id)) : null

  return (
    <div className="container">
      <Navbar bg="light" expand="lg">
        <div className="d-flex flex-row justify-content-start">
          <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="#" as="span"><Link to="/blogs">blogs</Link></Nav.Link>
              <Nav.Link href="#" as="span"><Link to="/users">users</Link></Nav.Link>
              {loginUser
                ? <Nav>
                  <Navbar.Text className="me-1">
                    {loginUser.name} logged in
                  </Navbar.Text>
                  <Button variant="outline-dark" onClick={handleLogout}>Log out</Button>
                </Nav>
                : <Nav.Link href="#" as="span"><Link to="/login">login</Link></Nav.Link>
              }
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      <Notification/>
      <Routes>
        <Route path="/users/:id" element={loginUser ? <User /> : <Navigate replace to="/login" />} />
        <Route path="/users" element={loginUser ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/blogs/:id" element={loginUser ? <Blog blog={blog}/> : <Navigate replace to="/login" />}/>
        <Route path="/blogs" element={loginUser ? <Blogs userId={loginUser.id}/> : <Navigate replace to="/login" />}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={!loginUser ? <Home/> : <Navigate replace to="/blogs" />} />
      </Routes>
    </div>
  );
};

export default App;
