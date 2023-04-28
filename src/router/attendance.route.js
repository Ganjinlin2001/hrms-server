const Router = require("koa-router");

const {
  getStaffAllAttendanceRecord,
  getStaffTodayAttendanceRecord,
  addStaffAttendanceRecord,
  updateStaffAttendanceInfo,
  getAllStaffAttendanceRecord,
  searchAttendanceInfoByKeyWord
} = require("../controller/attendance.controller");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/attendance" });

router.get("/getStaffAllAttendanceRecord", getStaffAllAttendanceRecord);

router.get("/getStaffTodayAttendanceRecord", getStaffTodayAttendanceRecord);

router.post('/add', addStaffAttendanceRecord);

router.post('/updateStaffAttendanceInfo', updateStaffAttendanceInfo);

router.get('/getAllStaffAttendanceRecord', auth, getAllStaffAttendanceRecord);

router.get('/search', searchAttendanceInfoByKeyWord);

module.exports = router;
