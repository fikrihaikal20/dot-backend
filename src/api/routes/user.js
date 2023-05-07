var express = require('express');
var router = express.Router();
const {getUserProfile, updateUserProfile, deleteUserProfile} = require('../controllers/user')
const {authenticate} = require('../middlewares/authenticate')

router.get('/',authenticate, getUserProfile);
router.put('/update/',authenticate, updateUserProfile);
router.delete('/delete/',authenticate, deleteUserProfile);

module.exports = router;
