const express = require('express')
const {fetchMovies} = require('../controller/movieController')
const router = express.Router();

router.get('/', fetchMovies)

module.exports = router