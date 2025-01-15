import { screen, render } from '@testing-library/react'

import PredictionResult from './PredictionResult'

describe('<PredictionResult />', () => {
  it('renders component', () => {
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
      />
    )

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      'german shepherd'
    )
    expect(screen.getByText(/80,00/im)).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', wikiUrl)
    expect(screen.getByText(desc)).toBeInTheDocument()
  })

  describe('when wikipedia is not found', () => {
    it('show message', () => {
      render(
        <PredictionResult
          prediction={{ probability: 0.8, className: 'german_shepherd' }}
          description={{
            error: 'Failed to fetch wikipedia resource',
          }}
        />
      )

      expect(screen.getByText('Wikipedia not found.')).toBeInTheDocument()
    })
  })

  describe('when probability is low', () => {
    it('show alert warning', () => {
      render(
        <PredictionResult
          prediction={{ probability: 0.5, className: 'german_shepherd' }}
          description={{
            desc: 'https://en.wikipedia.org/wiki/German_Shepherd',
            wikiUrl:
              'The German Shepherd is a breed of medium to large-sized working dog that originated in Germany',
          }}
        />
      )

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert')).toHaveTextContent(
        'Fail to identity dog breed, try again with a different image.'
      )
    })
  })
})
