const authControllers = require('../controllers/authControllers')
const { authMiddleware } = require('../middlewares/authMiddlewares')
const router = require('express').Router()

 router.post('/admin-login', authControllers.admin_login)
 router.get('/get-user', authMiddleware, authControllers.getUser)
 router.post('/seller-register', authControllers.admin_login)


 module.exports = router