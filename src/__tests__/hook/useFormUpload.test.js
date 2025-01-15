import { screen, render } from '@testing-library/react'
import path from 'path'

import FormUpload from 'components/FormUpload/FormUpload'
import { useFormUpload } from 'components/FormUpload/useFormUpload'

jest.mock('../../components/FormUpload/useFormUpload')

describe('useFormUpload', () => {
	it('shows preview and description', () => {
		const filePath = path.resolve(__dirname, '..', 'downloads', 'dog.jpg')
		const file = new File(['dog'], filePath, {
			type: 'image/jpg',
		})

		useFormUpload.mockReturnValue({
			onDrop: jest.fn(),
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

		expect(screen.getByRole('figure')).toBeInTheDocument()
		expect(screen.queryByRole('img', { name: filePath })).toHaveAttribute(
			'src',
			filePath,
		)
		expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
			'german shepherd',
		)
		expect(screen.getByText('lorem ipsum dolor sit')).toBeInTheDocument()
		expect(screen.getByRole('link')).toHaveAttribute(
			'href',
			'https://wikipedia.org',
		)
	})

	describe('when scan fail', () => {
		it('returns alert', () => {
			const filePath = path.resolve(__dirname, '..', 'downloads', 'dog.jpg')
			const file = new File(['dog'], filePath, {
				type: 'image/jpg',
			})

			useFormUpload.mockReturnValue({
				onDrop: jest.fn(),
				file: Object.assign(file, { preview: filePath }),
				prediction: {},
				description: {},
				error: 'Unable to predict image',
				isFinished: true,
			})

			render(<FormUpload />)

			expect(screen.getByRole('alert')).toBeInTheDocument()
			expect(screen.getByRole('alert')).toHaveTextContent(
				'Fail to scan image, try again with a different one.',
			)
		})
	})
})
