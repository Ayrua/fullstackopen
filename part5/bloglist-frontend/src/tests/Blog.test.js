import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'

test('renders content', async () => {
  const blog = {
    title: 'Test Title',
    author: 'Test Author',
    url: 'Test URL',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getAllByText(`${blog.title} ${blog.author}`)
  // screen.debug(element)
  expect(element).toBeDefined()

  const user = userEvent.setup()
  const button = screen.getByText('show')
  await user.click(button)

  const element_likes = screen.getByText(`likes ${blog.likes}`)
  expect(element_likes).toBeDefined()
  const element_url = screen.getByText('Test URL')
  expect(element_url).toBeDefined()
})