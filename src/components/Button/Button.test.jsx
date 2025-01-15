import { screen, render } from '@testing-library/react'
import { describe, test, expect, vi } from 'vitest'

import Button from './Button'
import userEvent from '@testing-library/user-event'

describe('<Button />', () => {
	test('renders component with button role', () => {
		render(<Button>Submit</Button>)
		expect(screen.getByRole('button')).toBeDefined()
		expect(screen.getByRole('button').className).toContain('button')
	})

	test('call onClick', async () => {
		const onClick = vi.fn()
		const user = userEvent.setup()
		render(<Button onClick={onClick}>Click me</Button>)

		const button = screen.getByRole('button', { name: /click me/i })
		await user.click(button);

		expect(onClick).toBeCalledTimes(1)
	})
})
