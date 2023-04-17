const Router = require("koa-router");
const router = new Router({ prefix: "/api/performance" });

const { addPerformance, getStaffAllPerformanceList, getAllStaffPerformance, updateStaffPerformance, searchPerformance } = require("../controller/performance.controller");

const { verifyRecordIsExit } = require("../middleware/performance.middleware");
const { auth } = require("../middleware/auth.middleware");

router.post("/addPerformance", verifyRecordIsExit, addPerformance);

router.get('/getStaffAllPerformanceList', getStaffAllPerformanceList);

router.get('/getAll', auth, getAllStaffPerformance);

router.post('/update', auth, updateStaffPerformance);

router.get('/search', auth, searchPerformance);

module.exports = router;
