import { screen, render } from '@testing-library/react'
import path from 'node:path'
import { vi, describe, test, expect } from 'vitest'

import FormUpload from '@/components/FormUpload/FormUpload'
import { useFormUpload } from '@/components/FormUpload/useFormUpload'

vi.mock('../../components/FormUpload/useFormUpload')

describe('useFormUpload', () => {
	test('shows preview and description', () => {
		const filePath = path.resolve(__dirname, '..', 'downloads', 'dog.jpg')
		const file = new File(['dog'], filePath, {
			type: 'image/jpg',
		})

		useFormUpload.mockReturnValue({
			onDrop: vi.fn(),
			file: Object.assign(file, { preview: filePath }),
			prediction: { probability: 1, className: 'german shepherd' },
			description: {
				desc: 'lorem ipsum dolor sit',
				wikiUrl: 'https://wikipedia.org',
			},
			error: null,
			isFinished: true,
		})

		render(<FormUpload />)

		expect(screen.getByRole('figure')).toBeDefined()
		expect(screen.getByTestId('preview-image').getAttribute('src')).toBe(filePath)
		expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
			'german shepherd',
		)
		expect(screen.getByText('lorem ipsum dolor sit')).toBeDefined()
		expect(screen.getByRole('link').getAttribute('href')).toBe(
			'https://wikipedia.org',
		)
	})

	describe('when scan fail', () => {
		test('returns alert', () => {
			const filePath = path.resolve(__dirname, '..', 'downloads', 'dog.jpg')
			const file = new File(['dog'], filePath, {
				type: 'image/jpg',
			})

			useFormUpload.mockReturnValue({
				onDrop: vi.fn(),
				file: Object.assign(file, { preview: filePath }),
				prediction: {},
				description: {},
				error: 'Unable to predict image',
				isFinished: true,
			})

			render(<FormUpload />)

			expect(screen.getByRole('alert')).toBeDefined()
			expect(screen.getByRole('alert').textContent).toBe(
				'Fail to scan image, try again with a different one.',
			)
		})
	})
})
