const Router = require("koa-router");

// const { login } = require("../controller/user.controller");
const {
  getAdminInfo,
  checkAdminCode,
  getAdminList,
  update,
  del,
  changePassword,
} = require("../controller/admin.controller");

const { judgeCodeIsExpired } = require("../middleware/code.middleware");

const { crpytPassword } = require("../middleware/user.middleware");

const { auth } = require("../middleware/auth.middleware");

const { checkAdminIsExist } = require("../middleware/admin.middleware");
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
router.post("/del", auth, del);

// 通过关键词查找管理员
router.get("/getAdminInfoByKeyWord", auth, getAdminInfo);

// 找回密码
router.post(
  "/changePassword",
  checkAdminIsExist,
  judgeCodeIsExpired,
  crpytPassword,
  changePassword
);

module.exports = router;
