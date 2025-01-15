import { screen, render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import Preview from './Preview'

describe('<Preview />', () => {
	test('renders component with file', () => {
		const file = new File(['dog'], '../downloads/dog.jpg', {
			type: 'image/jpg',
		})
		render(<Preview file={file} />)
		expect(screen.getByText(/dog.jpg/i)).toBeDefined()
	})
})
