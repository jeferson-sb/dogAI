import { screen, render } from '@testing-library/react'

import DropContainer from './DropContainer'

describe('<DropContainer />', () => {
  it('renders component', () => {
    render(
      <DropContainer
        header="Click here"
        subheader="to send your photo"
        Image={() => <img src="assets/uploadImage.svg" alt="upload" />}
      />
    )
    expect(screen.getByTestId('dropzone-container')).toBeInTheDocument()
    expect(screen.getByText('Click here')).toBeInTheDocument()
    expect(screen.getByText('to send your photo')).toBeInTheDocument()
  })

  it('renders component in active state', () => {
    render(
      <DropContainer
        active
        header="Drop file"
        Image={() => <img src="assets/uploadImage.svg" alt="upload" />}
      />
    )
    expect(screen.getByTestId('dropzone-container')).toHaveClass(
      'dropContainer active'
    )
  })

  it('renders component in reject state', () => {
    render(
      <DropContainer
        reject
        header="Drop file"
        Image={() => <img src="assets/uploadImage.svg" alt="upload" />}
      />
    )
    expect(screen.getByTestId('dropzone-container')).toHaveClass(
      'dropContainer reject'
    )
  })
})
