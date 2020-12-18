const router = require('express').Router()
const SeriesController = require('../controllers/series')

router.get('/series', SeriesController.getSerieList)
router.get('/series/:id', SeriesController.getById)
router.post('/series', SeriesController.create)
router.put('/series/:id', SeriesController.updateSerie)
router.delete('/series/:id', SeriesController.delete)

module.exports = router