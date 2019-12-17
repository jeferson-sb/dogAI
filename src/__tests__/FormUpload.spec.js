import React from 'react'
import { create } from 'react-test-renderer'
import FormUpload from '../components/FormUpload/FormUpload.jsx'

describe('FormUpload component', () => {
  test('Matches the snapshot', () => {
    const component = create(<FormUpload />)
    expect(component).toMatchSnapshot()
  })
})
