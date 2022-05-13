const router = require("express").Router();

const userCtrl = require("../controllers/userCtrl");

router.patch("/user",  userCtrl.updateUser);
router.get("/search",  userCtrl.searchUser);
router.get('/getuser', userCtrl.getUser);


module.exports = router;

