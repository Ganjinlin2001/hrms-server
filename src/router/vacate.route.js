const Router = require("koa-router");

const {
  getStaffLateRecord,
  getStaffAllVacateRecord,
  addStaffVacateApply,
  cancelVacateApply,
  getAllStaffVacateRecord,
  updateStaffVacateInfoByCode,
  getStaffVacateInfoByKeyWord
} = require("../controller/vacate.controller");
const { auth } = require("../middleware/auth.middleware");

// 添加路径前缀
const router = new Router({ prefix: "/api/vacate" });

router.get("/getStaffLateVacateRecord", getStaffLateRecord);

router.get("/getStaffAllVacateRecord", getStaffAllVacateRecord);

router.post("/addStaffVacateApply", addStaffVacateApply);

router.post("/cancel", cancelVacateApply);

// 管理员相关的
router.get("/getAllStaffVacateRecord", auth, getAllStaffVacateRecord);

// router.get('/getStaffVacateInfoByCode', auth, getStaffVacateInfoByCode);

router.get('/search', getStaffVacateInfoByKeyWord);

router.post('/updateStaffVacateInfoByCode', auth, updateStaffVacateInfoByCode);

module.exports = router;
