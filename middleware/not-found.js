 // MIDDLEWARE THAT IS USED WHEN USER REQUEST A NON EXISTING PAGE ON THE SERVER 
const notFoundMiddleware = (req, res) => {
    res.status(404).send('Route Does Not Exist');
}

export default notFoundMiddleware