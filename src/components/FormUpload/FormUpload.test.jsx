import path from 'node:path'

import { screen, render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, test, expect } from 'vitest'

import FormUpload from '@/components/FormUpload/FormUpload'

describe('<FormUpload />', () => {
	test('should upload file to form component', async () => {
		render(<FormUpload />)

		const user = userEvent.setup()
		const filePath = path.resolve(
			__dirname,
			'..',
			'..',
			'__test__',
			'downloads',
			'dog.jpg',
		)
		const file = new File(['dog'], filePath, {
			type: 'image/jpg',
		})

		const fileInput = screen.getByTestId('upload-image')

		await user.upload(fileInput, file)

		expect(fileInput).toBeDefined()
		expect(fileInput.files[0]).toStrictEqual(file)
		expect(fileInput.files).toHaveLength(1)
	})

	test('should upload by drag and drop', () => {
		render(<FormUpload />)

		const filePath = path.resolve(
			__dirname,
			'..',
			'..',
			'__test__',
			'downloads',
			'dog.jpg',
		)
		const file = new File(['dog'], filePath, {
			type: 'image/jpg',
		})

		const fileInput = screen.getByTestId('upload-image')

		Object.defineProperty(fileInput, 'files', {
			value: [file],
		})

		fireEvent.drop(fileInput)

		expect(fileInput).toBeDefined()
		expect(fileInput.files[0]).toStrictEqual(file)
		expect(fileInput.files).toHaveLength(1)
	})
})
