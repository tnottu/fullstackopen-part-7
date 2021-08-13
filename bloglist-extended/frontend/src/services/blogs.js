import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {}

const setToken = newToken => {
  token = `bearer ${newToken}`
  config.headers = { Authorization: token }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (blog) => {
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const update = async (blog) => {
  if (typeof blog.user === 'object') {
    blog.user = blog.user.id
  }
  const response = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return response.data
}

const remove = async (blog) => {
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  return response.data
}

const createComment = async (blog, comment) => {
  const response = await axios.post(`${baseUrl}/${blog.id}/comments`, { text: comment }, config)
  return response.data
}

export default { getAll, setToken, create, update, remove, createComment }
