const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.createUser)
router.post('/login', userController.loginUser)
router.post('/logout', userController.logoutUser)
router.put('/:id', userController.deleteUser)
router.delete('/:id', userController.deleteUser)

router.get('/new', userController.creeateForm)

module.exports = router