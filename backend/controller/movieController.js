const asyncHandler = require('express-async-handler');
const axios = require('axios')
const utf8 = require('utf-8')

const fetchMovies = asyncHandler(async(req,res) => {    
    const response = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
    const movies = utf8.encode(response.data.toString())
    console.log(response)
    res.status(200).json(response.data)
})

module.exports = {fetchMovies}