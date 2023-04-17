const Router = require("koa-router");

const { register, login, getStaffList, adminUpdate, getStaffInfo, changePassword } = require("../controller/staff.controller");
const { auth } = require("../middleware/auth.middleware");
const { checkStaffIsExist, verifyStaffCodeIsExist, verifyPassword, checkApplyhasPass, isStaffLeave } = require("../middleware/staff.middleware");
const { crpytPassword } = require("../middleware/user.middleware");

const { judgeCodeIsExpired } = require("../middleware/code.middleware");

const router = new Router({ prefix: "/api/staff" });

// 员工登录
router.post('/login', checkStaffIsExist, verifyPassword, checkApplyhasPass, isStaffLeave, login);

// 员工注册
router.post("/register", verifyStaffCodeIsExist, crpytPassword, register);

// 管理员获取所有员工信息
router.get('/getAll', auth, getStaffList);

// 获取单条员工的信息
router.get('/getStaffInfo', getStaffInfo);

// 管理员端更新员工信息
router.post("/adminUpdate", auth, adminUpdate);

// 员工更新自己的信息
router.post('/staffUpdate', adminUpdate);

// 员工重置密码
router.post('/changePassword', checkStaffIsExist, isStaffLeave, judgeCodeIsExpired, crpytPassword, changePassword);

module.exports = router;
