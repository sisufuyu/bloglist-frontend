import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { setNotification, clearNotification } from './notificationSlice'

export const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    createBlogs(state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => {
        if(updatedBlog.id === blog.id){
          return updatedBlog
        }else return blog
      })
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { appendBlog, createBlogs, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(createBlogs(blogs))
  }
}

export const addBlog = (newBlog) => {
  return async (dispatch) => {
    try{
      const savedBlog = await blogService.create(newBlog);
      dispatch(appendBlog(savedBlog))
    }catch(err) {
      dispatch(setNotification("blog created failed"));
      dispatch(clearNotification(5000))
    }
  }
}

export const likeBlog = (id, newBlog) => {
  return async (dispatch) => {
    const blog = await blogService.update(id, newBlog);
    dispatch(updateBlog(blog))
  }
}

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export const newComment = (id, comments) => {
  return async (dispatch) => {
    try{
      const updatedBlog = await blogService.addComment(id, comments);
      dispatch(updateBlog(updatedBlog))
    } catch (err) {
      dispatch(setNotification('failed to add comments'))
      dispatch(clearNotification(5000))
    }
  }
}

export default blogSlice.reducer