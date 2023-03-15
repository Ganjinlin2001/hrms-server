const Router = require("koa-router");

// const { login } = require("../controller/user.controller");
const { getAdminInfo } = require("../controller/admin.controller");
const { authCode } = require("../controller/code.controller");
const {
  verifyLogin,
  judgeCodeIsExpired,
} = require("../middleware/user.middleware");

const router = new Router({ prefix: "/api" });

router.get("/code", authCode);

module.exports = router;
