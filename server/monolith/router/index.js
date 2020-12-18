const router = require('express').Router()
const Controller = require('../controllers/controllers')
const Series = require('../controllers/series')

router.get('/movies', Controller.getMovieList)
router.get('/movies/:id', Controller.getById)
router.post('/movies', Controller.create)
router.put('/movies/:id', Controller.updateMovie)
router.delete('/movies/:id', Controller.delete)

router.get('/series', Series.getSeriesList)
router.get('/series/:id', Series.getById)
router.post('/series', Series.create)
router.put('/series/:id', Series.updateSeries)
router.delete('/series/:id', Series.delete)

module.exports = router