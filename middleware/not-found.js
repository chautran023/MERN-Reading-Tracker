const notFoundMiddleware = (req, res) => {
    res.status(404).send('Route not existed');
}
export default notFoundMiddleware