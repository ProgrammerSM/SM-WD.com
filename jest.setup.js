// Modules
import '@testing-library/jest-dom'
import React from 'react' // eslint-disable-line no-unused-vars -- Need to import as global level for tests

const { ResizeObserver } = window
beforeEach(() => {
  delete window.ResizeObserver
  window.ResizeObserver = jest.fn()
    .mockImplementation(() => ({
      disconnect: jest.fn(),
      observe: jest.fn(),
      unobserve: jest.fn(),
    }))
})

afterEach(() => {
  window.ResizeObserver = ResizeObserver
  jest.restoreAllMocks()
})
