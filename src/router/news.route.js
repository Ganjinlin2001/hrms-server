const Router = require("koa-router");

const {
  addArticle,
  updateArticle,
  getNewsList,
  getArticleInfo,
  staffGetNewsList,
  delArticle,
  searchNewsByKeyWord
} = require("../controller/news.controller");
const { articleIsExist } = require("../middleware/news.middleware");
const { auth } = require("../middleware/auth.middleware");

const router = new Router({ prefix: "/api/news" });

router.post("/add", auth, articleIsExist, addArticle);

router.post("/update", auth, updateArticle);

router.get("/getNewsList", auth, getNewsList);

router.get('/getArticleInfo', getArticleInfo);

// 删除新闻文章
router.post('/delArticle', auth, delArticle);

// 按关键词搜索文章
router.get('/searchNewsByKeyWord', auth, searchNewsByKeyWord);

// 员工获取新闻列表
router.get('/staffGetNewsList', staffGetNewsList);

module.exports = router;
