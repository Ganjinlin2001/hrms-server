const { createArticle, updateArticleInfo, getNewsList } = require("../service/news.service");

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
    const { title, article_id, cover, brief, content, html } = ctx.request.body;
    const res = await updateArticleInfo({
      title,
      article_id,
      cover,
      brief,
      content,
      html,
    });
    ctx.body = {
      code: 200,
      message: '保存成功',
      result: res,
    }
  }

  async getNewsList(ctx) {
    const {limit, offset} = ctx.request.body;
    const res = await getNewsList({limit, offset});
    ctx.body = {
      code: 200,
      message: '数据获取成功',
      result: res,
    }
  }
}

module.exports = new NewsController();
