const { Router } = require('express');
const profileController = require('../controllers/profileController');

const router = Router();


router.get('/profile', profileController.get_profile);
router.post('/namechange', profileController.namechange);
router.post('/batchchange', profileController.batchchange);
router.post('/skillschange', profileController.skillschange);
router.post('/addjob', profileController.addjob);
router.post('/deletejob', profileController.deletejob);
router.post('/addintern', profileController.addintern);
router.post('/deleteintern', profileController.deleteintern);
router.post('/glinkchange', profileController.glinkchange);
router.post('/clinkchange', profileController.clinkchange);
router.post('/changepassword', profileController.changepassword);
module.exports = router;