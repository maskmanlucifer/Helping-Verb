const { Router } = require('express');
const projectController = require('../controllers/projectController');
let bodyParser = require('body-parser');

let methodOverride = require('method-override');
const { stringify } = require('querystring');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = Router();
router.use(methodOverride('_method'));

let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/project', projectController.get_project);
router.get('/myproject', projectController.get_my_project);
router.get('/addproject', projectController.get_add_my_project);
router.post('/addproject', projectController.post_add_my_project);
router.post('/deleteproject', projectController.post_delete_my_project);
router.post('/projectfilter', checkUser,urlencodedParser,projectController.filter);
module.exports = router;