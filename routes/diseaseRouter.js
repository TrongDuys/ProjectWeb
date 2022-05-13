const router = require("express").Router();
const diseaseCtrl = require("../controllers/diseaseCtrl");

router
  .route("/disease")
  .post( diseaseCtrl.createDisease)
  .get( diseaseCtrl.getDisease);



module.exports = router;
