const Router = require("koa-router");

const {
  getLateRecord,
  addStaffLeaveApply,
  cancelStaffLeaveApply,
  getAllStaffLeaveRecord,
  getStaffLeaveInfoByKeyWord,
  updateStaffLeaveInfoByCode,
  getStaffInfo,
  passStaffLeave,
  del
} = require("../controller/leave.controller");

const { sendPDF } = require("../middleware/leave.middleware");

const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/leave" });

router.get("/getLateRecord", getLateRecord);

router.post("/add", addStaffLeaveApply);

router.post("/cancel", cancelStaffLeaveApply);

// 管理员相关接口
router.get("/getAllStaffLeaveRecord", auth, getAllStaffLeaveRecord);

router.get("/getStaffLeaveInfoByKeyWord", auth, getStaffLeaveInfoByKeyWord);

router.post("/updateStaffLeaveInfoByCode", auth, updateStaffLeaveInfoByCode);

router.post("/updateLeave", updateStaffLeaveInfoByCode);

router.get("/getStaffInfo", auth, getStaffInfo);

// 通过审批事件
router.post("/pass", auth, sendPDF, updateStaffLeaveInfoByCode);
// router.post("/pass", auth, updateStaffLeaveInfoByCode);

router.post('/del', auth, del);

module.exports = router;
