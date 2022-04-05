import { useState } from "react";
import { Form, FormGroup } from "react-bootstrap";

const CreateBlog = ({ handleCreateBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    handleCreateBlog(newBlog)

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormGroup className="mb-3">
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type = "text"
          id="title-input"
          name="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          id="author-input"
          name="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </FormGroup>
      <FormGroup className="mb-3">
        <Form.Label>Blog Link:</Form.Label>
        <Form.Control
          type="text"
          id="url-input"
          name="url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </FormGroup>
      <button type="submit" className="create-blog-btn btn">
        Create
      </button>
    </Form>
  );
};

export default CreateBlog;
