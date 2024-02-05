import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'


describe('renders content', () => {

  test('blog title and author', async () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author'
    }

    render(<Blog blog={blog} />)

    const element = screen.getAllByText(`${blog.title} ${blog.author}`)
    expect(element).toBeDefined()
  })

  test('blog url and likes', async () => {
    const blog = {
      title: 'Test Title',
      author: 'Test Author',
      url: 'Test URL',
      likes: 0
    }

    render(<Blog blog={blog} />)

    const user = userEvent.setup()
    const button = screen.getByText('show')
    await user.click(button)

    const element_likes = screen.getByText(`likes ${blog.likes}`)
    expect(element_likes).toBeDefined()
    const element_url = screen.getByText('Test URL')
    expect(element_url).toBeDefined()
  })
})

test('like button is pressed twice', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test URL',
    likes: 0
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} handleLikes={mockHandler}/>)

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const like_button = screen.getByText('like')
  await user.click(like_button)
  await user.click(like_button)
  expect(mockHandler.mock.calls).toHaveLength(2)
})