const Router = require("koa-router");
const router = new Router({ prefix: "/api/recruitment" });

const {
  getJobList,
  addJob,
  updateJobInfo,
  searchJobByKeyWord,
  deleteJob,
} = require("../controller/recruitment.controller");

const { auth } = require("../middleware/auth.middleware");

router.get("/getJobList", getJobList);

router.post("/add", auth, addJob);

router.post("/update", auth, updateJobInfo);

router.get("/search", searchJobByKeyWord);

router.post("/del", auth, deleteJob);

module.exports = router;
