const Router = require("koa-router");

const {
  addStaffJobApply,
  getLateRecord,
  cancelJobApply,
  getStaffAll,
  getAll,
  getStaffJobInfoByCode,
  updateStaffJobInfoByCode,
  del
} = require("../controller/job.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/job" });

router.post("/add", addStaffJobApply);

router.get("/getLate", getLateRecord);

// 取消申请
router.post('/cancelJobApply', cancelJobApply);

// 获取所有的员工调岗记录
router.get('/getStaffAll', getStaffAll);

router.get('/getAll', auth, getAll);

router.get('/getStaffJobInfoByKeyWord', getStaffJobInfoByCode);

// 员工更新自己的信息
router.post('/updateStaffJobInfoByCode', auth, updateStaffJobInfoByCode);

router.post('/del', auth, del);

module.exports = router;
