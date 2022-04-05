import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector(state => state.notification)
  if (message) {
    return <div className="alert alert-dark" role="alert">{message}</div>;
  } else {
    return null;
  }
};

export default Notification;
