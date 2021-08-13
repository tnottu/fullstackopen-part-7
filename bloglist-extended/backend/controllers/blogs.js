const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')
const Blog = require('../models/blog')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blog = new Blog(Object.assign(request.body, {
    user: user._id,
  }))

  const savedBlog = await blog.save()

  await savedBlog
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
    .execPopulate()

  user.blogs = user.blogs.concat(savedBlog.id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
  const user = request.user
  const blogToDelete = await Blog.findById(request.params.id)

  if (!user || user.id.toString() !== blogToDelete.user.toString()) {
    return response.status(401).json({ error: 'unauthorized user' })
  }

  // Remove comments
  await Comment.deleteMany({
    _id: {
      $in: blogToDelete.comments
    },
  })

  await blogToDelete.deleteOne()

  user.blogs = user.blogs.filter(blog => blog.toString() !== blogToDelete.id.toString())
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const blog = { title, author, url, likes }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  await updatedBlog
    .populate('user', { username: 1, name: 1 })
    .populate('comments')
    .execPopulate()

  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const comment = new Comment(request.body)
  const savedComment = await comment.save()

  blog.comments = [...blog.comments, savedComment]

  const savedBlog = await blog.save()
  await savedBlog.populate('user', { username: 1, name: 1 })
    .populate('comments')
    .execPopulate()

  response.status(201).json(savedBlog)
})

module.exports = blogsRouter
