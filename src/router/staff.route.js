const Router = require("koa-router");

const { register, login, getStaffList, adminUpdate } = require("../controller/staff.controller");
const { auth } = require("../middleware/auth.middleware");
const { checkStaffIsExist, verifyStaffCodeIsExist, verifyPassword, checkApplyhasPass } = require("../middleware/staff.middleware");
const { crpytPassword } = require("../middleware/user.middleware");

const router = new Router({ prefix: "/api/staff" });

// 员工登录
router.post('/login', checkStaffIsExist, verifyPassword, checkApplyhasPass, login);

// 员工注册
router.post("/register", verifyStaffCodeIsExist, crpytPassword, register);

// 管理员获取所有员工信息
router.get('/getAll', auth, getStaffList);

// 管理员端更新员工信息
router.post("/adminUpdate", auth, adminUpdate);

module.exports = router;
