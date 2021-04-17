const { Router } = require('express');
let bodyParser = require('body-parser');

let methodOverride = require('method-override');
const { stringify } = require('querystring');
const jobinternController = require('../controllers/jobinternController');
// import auth-checkers
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = Router();

router.use(methodOverride('_method'));

let urlencodedParser = bodyParser.urlencoded({ extended: false });


router.get('/job', jobinternController.job);
router.get('/intern',jobinternController.intern);
router.post('/jobinternfilter',checkUser,urlencodedParser,jobinternController.filter);
module.exports = router;