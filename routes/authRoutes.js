const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router(); 

router.get('/signup', authController.signup_get);
router.post('/signup', authController.signup_post);
router.get('/login', authController.login_get);
router.post('/login', authController.login_post);
router.get('/logout', authController.logout_get);
router.get('/verify',authController.verify_get);
router.get('/recover',authController.recover_get);
router.post('/recover',authController.recover_post);
router.get('/changepassword',authController.changepassword_get);
module.exports = router; 