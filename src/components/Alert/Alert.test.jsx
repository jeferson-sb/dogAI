import { screen, render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import Alert from './Alert'

describe('<Alert />', () => {
	test('renders component with alert role', () => {
		render(<Alert type="warning">Message</Alert>)
		expect(screen.getByRole('alert')).toBeDefined()
		expect(screen.getByRole('alert').className).toContain('warning')
	})
})
