const Router = require("koa-router");

// const { login } = require("../controller/user.controller");
const { getAdminInfo, login } = require("../controller/admin.controller");

const {
  checkAdminIsExist,
  verifyPassword,
  verifyApplyStatus,
} = require("../middleware/admin.middleware");

const router = new Router({ prefix: "/api" });

// 登录时后端不需要再对密码进行加密，直接传输即可，后续拿到账号密码后再解密对比
// 查看管理员是否通过审核
router.post(
  "/login",
  checkAdminIsExist,
  verifyPassword,
  verifyApplyStatus,
  login
);

// router.get("/getAdminInfo", getAdminInfo);

module.exports = router;
