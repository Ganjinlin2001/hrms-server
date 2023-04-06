const Router = require("koa-router");

const {
  addArticle,
  updateArticle,
  getNewsList,
} = require("../controller/news.controller");
const { articleIsExist } = require("../middleware/news.middleware");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/news" });

router.post("/add", auth, articleIsExist, addArticle);

router.post("/update", auth, updateArticle);

router.get("/getNewsList", auth, getNewsList);

module.exports = router;
