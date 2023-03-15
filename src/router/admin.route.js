const Router = require("koa-router");

// const { login } = require("../controller/user.controller");
const {
  getAdminInfo,
  checkAdminCode,
  getAdminList,
  update,
  deleteAdmin
} = require("../controller/admin.controller");

const { auth } = require("../middleware/auth.middleware");
// const {
//   verifyLogin,
//   judgeCodeIsExpired,
// } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/api/admin" });

// 验证管理员是否已经提交注册申请
router.get("/checkAdminCode", checkAdminCode);

// 获取管理员列表
router.get("/getAll", auth, getAdminList);

// 更新管理员信息
router.post("/update", auth, update);

// 删除管理员
router.post('/del', auth, deleteAdmin);

// 通过工号查找管理员
router.get('/getInfoByCode', auth, getAdminInfo);

module.exports = router;
