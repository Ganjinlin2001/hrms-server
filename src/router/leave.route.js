const Router = require("koa-router");

const {
  getLateRecord,
  addStaffLeaveApply,
  cancelStaffLeaveApply,
  getAllStaffLeaveRecord,
  getStaffLeaveInfoByCode,
  updateStaffLeaveInfoByCode
} = require("../controller/leave.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/leave" });

router.get("/getLateRecord", getLateRecord);

router.post("/add", addStaffLeaveApply);

router.post("/cancel", cancelStaffLeaveApply);

// 管理员相关接口
router.get('/getAllStaffLeaveRecord', auth, getAllStaffLeaveRecord);

router.get('/getStaffLeaveInfoByCode', auth, getStaffLeaveInfoByCode);

router.post('/updateStaffLeaveInfoByCode', auth, updateStaffLeaveInfoByCode);

module.exports = router;
