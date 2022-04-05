import { useState } from "react";
import { initializeUser } from "../reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return{
    type,
    value,
    onChange
  }
}

const Login = ({ hanldeLogin }) => {
  const username = useField('text');
  const password = useField('text');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(initializeUser(username.value, password.value));
    navigate("/")
  }

  return (
    <Form onSubmit={onSubmit} className="w-25 mx-auto">
      <Form.Group className="mb-3">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type={username.type}
          name="username"
          id="username-input"
          value={username.value}
          onChange={username.onChange}/>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type={password.type}
          name="password"
          id="password-input"
          value={password.value}
          onChange={password.onChange}/>
      </Form.Group>
      <button type="submit" className="btn login-btn">Log in</button>
    </Form>
  );
};

export default Login;
