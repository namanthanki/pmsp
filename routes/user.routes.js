const router = require('express').Router();
const UserController = require('../controllers/user.controller');

router.post('/api/register', UserController.register);
router.post('/api/login', UserController.login);
// router.post('/api/activate', UserController.activate);

module.exports = router;