const Router = require("koa-router");

const {
  getLateRecord,
  getStaffAllDormitoryRocord,
  addStaffDormitoryApply,
  cancelStaffDormitoryApply,
  getAllStaffDormitoryRecord,
  getStaffDormitoryInfoByKeyWord,
  updateStaffDormitoryInfoByCode,
  del
} = require("../controller/dormitory.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/dormitory" });

router.post("/add", addStaffDormitoryApply);

router.get("/getLate", getLateRecord);

router.get("/getStaffAllDormitoryRocord", getStaffAllDormitoryRocord);

router.post("/cancel", cancelStaffDormitoryApply);

router.get("/getAllStaffDormitoryRecord", auth, getAllStaffDormitoryRecord);

router.get('/getStaffDormitoryInfoByKeyWord', getStaffDormitoryInfoByKeyWord);

router.post('/updateStaffDormitoryInfoByCode', auth, updateStaffDormitoryInfoByCode);

router.post('/del', auth, del);

module.exports = router;
