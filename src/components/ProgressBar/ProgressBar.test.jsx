import { screen, render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import ProgressBar from './ProgressBar'

describe('<ProgressBar />', () => {
	test('render progress bar component', () => {
		render(
			<ProgressBar min="0" max="100" value="50">
				50%
			</ProgressBar>,
		)
		const progress = screen.getByText(/50%/i)
		expect(progress).toBeDefined()
	})
})
