const { Router } = require('express');
let bodyParser = require('body-parser');

let methodOverride = require('method-override');
const { stringify } = require('querystring');
const arenaController = require('../controllers/arenaController');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
const router = Router();

router.use(methodOverride('_method'));

let urlencodedParser = bodyParser.urlencoded({ extended: false });

router.get('/arena_1', arenaController.arena_1_get);
router.get('/arena_2', arenaController.arena_2_get);
router.get('/arena_3', arenaController.arena_3_get);
router.get('/arena_4', arenaController.arena_4_get);
router.get('/arena_5', arenaController.arena_5_get);
router.post('/arenafilter', checkUser,urlencodedParser,arenaController.filter);
module.exports = router;