import { screen, render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import PredictionResult from './PredictionResult'

describe('<PredictionResult />', () => {
	test('renders component', () => {
		const wikiUrl = 'https://en.wikipedia.org/wiki/German_Shepherd'
		const desc =
			'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany'
		render(
			<PredictionResult
				prediction={{ probability: 0.8, className: 'german_shepherd' }}
				description={{
					desc,
					wikiUrl,
				}}
			/>,
		)

		expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
			'german shepherd',
		)
		expect(screen.getByText(/80,00/im)).toBeDefined()
		expect(screen.getByRole('link').getAttribute('href')).toBe(wikiUrl)
		expect(screen.getByText(desc)).toBeDefined()
	})

	describe('when wikipedia is not found', () => {
		test('show message', () => {
			render(
				<PredictionResult
					prediction={{ probability: 0.8, className: 'german_shepherd' }}
					description={{
						error: 'Failed to fetch wikipedia resource',
					}}
				/>,
			)

			expect(screen.getByText('Wikipedia not found.')).toBeDefined()
		})
	})

	describe('when probability is low', () => {
		test('show alert warning', () => {
			render(
				<PredictionResult
					prediction={{ probability: 0.5, className: 'german_shepherd' }}
					description={{
						desc: 'https://en.wikipedia.org/wiki/German_Shepherd',
						wikiUrl:
							'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany',
					}}
				/>,
			)

			expect(screen.getByRole('alert')).toBeDefined()
			expect(screen.getByRole('alert').textContent).toBe(
				'Fail to identity dog breed, try again with a different image.',
			)
		})
	})
})
