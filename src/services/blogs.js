import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseUrl}/${id}`, newBlog);
  return response.data;
};

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  };
  await axios.delete(`${baseUrl}/${id}`, config);
};

const addComment = async (id, comments) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, comments);
  return response.data
}

const blogService = { setToken, getAll, create, update, remove, addComment };

export default blogService;
