const express = require('express')
const router = express.Router()
const {userValidate} = require('../validators/users')
const { getAllUsers, registerUser, getUserById, 
    updateUserById, deleteUserById, getUserByName } = require('../controllers/users')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', userValidate,  registerUser)
router.put('/:id', userValidate, updateUserById)
router.delete('/:id', deleteUserById)
router.post('/search', getUserByName)

module.exports =  router;
