const {
  createArticle,
  updateArticleInfo,
  getNewsList,
  getArticleInfo,
  staffGetNewsList,
  delArticle,
  searchNewsByKeyWord
} = require("../service/news.service");

class NewsController {
  async addArticle(ctx) {
    const { article_id } = ctx.request.body;
    const res = await createArticle({ article_id });
    ctx.body = {
      code: 200,
      message: "文章创建成功",
      result: res,
    };
  }

  async updateArticle(ctx) {
    const { title, article_id, cover, brief, content, html, is_publish } =
      ctx.request.body;
    const res = await updateArticleInfo({
      title,
      article_id,
      cover,
      brief,
      content,
      html,
      is_publish,
    });
    ctx.body = {
      code: 200,
      message: "保存成功",
      result: res,
    };
  }

  async getNewsList(ctx) {
    const { limit, offset } = ctx.request.body;
    const res = await getNewsList({ limit, offset });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  // 根据文章 id 获取单篇新闻的内容
  async getArticleInfo(ctx) {
    const data = ctx.query;
    const res = await getArticleInfo(data);
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async staffGetNewsList(ctx) {
    const res = await staffGetNewsList();
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async delArticle(ctx) {
    try {
      const { article_id } = ctx.request.body;
      const res = await delArticle({ article_id });
      ctx.body = {
        code: 200,
        message: "文章删除成功",
        result: res,
      };
    } catch (error) {
      console.log("错误", error);
    }
  }

  // 按关键词搜索文章处理方法
  async searchNewsByKeyWord(ctx) {
    const { keyWord } = ctx.query;
    const res = await searchNewsByKeyWord({keyWord});
    ctx.body = {
      code: 200,
      message: '数据获取成功',
      result: res,
    }
  }
}

module.exports = new NewsController();
