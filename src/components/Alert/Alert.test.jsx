import { screen, render } from '@testing-library/react'

import Alert from './Alert'

describe('<Alert />', () => {
  it('renders component with alert role', () => {
    render(<Alert type="warning">Message</Alert>)
    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert')).toHaveClass('alert warning')
  })
})
