const routeError = (req, res) => {
  res.status(200).json({ name: 'John Doe' })
  throw new Error('API throw error test')
}

export default routeError
