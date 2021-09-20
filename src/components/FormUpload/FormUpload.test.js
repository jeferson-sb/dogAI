import path from 'path'

import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import FormUpload from 'components/FormUpload/FormUpload'

describe('<FormUpload />', () => {
  it('should upload file to form component', () => {
    render(<FormUpload />)

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '__test__',
      'downloads',
      'dog.jpg'
    )
    const file = new File(['dog'], filePath, {
      type: 'image/jpg',
    })

    const fileInput = screen.getByTestId('upload-image')

    userEvent.upload(fileInput, file)

    expect(fileInput).toBeInTheDocument()
    expect(fileInput.files[0]).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
  })

  it('should upload by drag and drop', () => {
    render(<FormUpload />)

    const filePath = path.resolve(
      __dirname,
      '..',
      '..',
      '__test__',
      'downloads',
      'dog.jpg'
    )
    const file = new File(['dog'], filePath, {
      type: 'image/jpg',
    })

    const fileInput = screen.getByTestId('upload-image')

    Object.defineProperty(fileInput, 'files', {
      value: [file],
    })

    fireEvent.drop(fileInput)

    expect(fileInput).toBeInTheDocument()
    expect(fileInput.files[0]).toStrictEqual(file)
    expect(fileInput.files).toHaveLength(1)
  })

  describe('when file is unsupported', () => {
    it('show drop container message', async () => {
      render(<FormUpload />)

      const filePath = path.resolve(__dirname, '..', 'downloads', 'test.txt')
      const file = new File(['test'], filePath, {
        type: 'text/plain',
      })

      const fileInput = screen.getByTestId('upload-image')

      Object.defineProperty(fileInput, 'files', {
        value: [file],
      })

      fireEvent.dragEnter(fileInput)

      await waitFor(() => {
        expect(screen.getByText('File not supported!')).toBeInTheDocument()
      })
    })
  })
})
