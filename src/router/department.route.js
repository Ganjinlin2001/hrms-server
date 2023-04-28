const Router = require("koa-router");

const {
  getStaffAllDepartmentRocord,
  getLateRecord,
  addStaffDepartmentApply,
  cancelStaffDepartmentApply,
  getAllStaffDepartmentRecord,
  getStaffDepartmentInfoByKeyWord,
  updateStaffDepartmentInfoByCode
} = require("../controller/department.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/department" });

router.get("/getStaffAllDepartmentRocord", getStaffAllDepartmentRocord);

router.get("/getLate", getLateRecord);

router.post('/add', addStaffDepartmentApply);

router.post('/cancel', cancelStaffDepartmentApply);

router.get('/getAllStaffDepartmentRecord', auth, getAllStaffDepartmentRecord);

router.get('/getStaffDepartmentInfoByKeyWord', getStaffDepartmentInfoByKeyWord);

router.post('/updateStaffDepartmentInfoByCode', auth, updateStaffDepartmentInfoByCode);

module.exports = router;
