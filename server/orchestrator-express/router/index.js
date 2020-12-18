const router = require('express').Router()
const Movies = require('../controllers/movies')
const Series = require('../controllers/series')

router.get('/movies', Movies.getMovieList)
router.get('/movies/:id', Movies.getById)
router.post('/movies', Movies.create)
router.put('/movies/:id', Movies.updateMovie)
router.delete('/movies/:id', Movies.delete)

router.get('/series', Series.getSerieList)
router.get('/series/:id', Series.getById)
router.post('/series', Series.create)
router.put('/series/:id', Series.updateSerie)
router.delete('/series/:id', Series.delete)

module.exports = router