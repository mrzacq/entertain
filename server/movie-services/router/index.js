const router = require('express').Router()
const MovieController = require('../controllers/movies')

router.get('/movies', MovieController.getMovieList)
router.get('/movies/:id', MovieController.getById)
router.post('/movies', MovieController.create)
router.put('/movies/:id', MovieController.updateMovie)
router.delete('/movies/:id', MovieController.delete)

module.exports = router