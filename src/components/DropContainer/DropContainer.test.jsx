import { screen, render } from '@testing-library/react'
import { describe, test, expect } from 'vitest'

import DropContainer from './DropContainer'

describe('<DropContainer />', () => {
	test('renders component', () => {
		render(
			<DropContainer
				header="Click here"
				subheader="to send your photo"
				Image={() => <img src="assets/uploadImage.svg" alt="upload" />}
			/>,
		)
		expect(screen.getByTestId('dropzone-container')).toBeDefined()
		expect(screen.getByText('Click here')).toBeDefined()
		expect(screen.getByText('to send your photo')).toBeDefined()
	})

	test('renders component in active state', () => {
		render(
			<DropContainer
				active
				header="Drop file"
				Image={() => <img src="assets/uploadImage.svg" alt="upload" />}
			/>,
		)
		expect(screen.getByText('Drop file')).toBeDefined()
	})

	test('renders component in reject state', () => {
		render(
			<DropContainer
				reject
				header="File not supported!"
				Image={() => <img src="assets/uploadImage.svg" alt="upload" />}
			/>,
		)
		expect(screen.getByText('File not supported!')).toBeDefined()
	})
})
