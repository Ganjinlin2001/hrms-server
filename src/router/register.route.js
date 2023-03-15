const Router = require("koa-router");

const { register, checkAdminCode } = require("../controller/admin.controller");

const { checkAdminIsExist } = require("../middleware/admin.middleware");

const { judgeCodeIsExpired } = require("../middleware/code.middleware");

const { crpytPassword } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/api" });

// 登录时后端不需要再对密码进行加密，直接传输即可，后续拿到账号密码后再解密对比
router.post(
  "/register",
  checkAdminCode,
  judgeCodeIsExpired,
  crpytPassword,
  register
);

module.exports = router;
