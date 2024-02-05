import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from '../components/BlogForm'
import userEvent from '@testing-library/user-event'

test('<BlogFormm /> updates parent state and calls onSubmit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const title_field = screen.getByPlaceholderText('write blog title here')
  const author_field = screen.getByPlaceholderText('write blog author here')
  const url_field = screen.getByPlaceholderText('write blog url here')
  const add_button = screen.getByText('add')

  await user.type(title_field, 'Test Title')
  await user.type(author_field, 'Test Author')
  await user.type(url_field, 'Test Url')
  await user.click(add_button)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Test Title')
  expect(createBlog.mock.calls[0][0].author).toBe('Test Author')
  expect(createBlog.mock.calls[0][0].url).toBe('Test Url')
})