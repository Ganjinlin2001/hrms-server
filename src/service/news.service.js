const News = require("../model/news.model");

class NewsService {
  async getArticleInfo({ article_id }) {
    const where = {};
    article_id && Object.assign(where, { article_id });
    console.log("where: ", where);
    const res = await News.findOne({ where });
    console.log("res: ", res);
    return res ? res.dataValues : null;
  }

  async createArticle({ article_id }) {
    const res = News.create({ article_id });
    return res;
  }

  async updateArticleInfo({
    title,
    article_id,
    cover,
    brief,
    content,
    html,
    is_publish,
  }) {
    const where = {};
    const updateData = {};
    article_id && Object.assign(where, {article_id});
    cover && Object.assign(updateData, {cover});
    title && Object.assign(updateData, {title});
    brief && Object.assign(updateData, {brief});
    content && Object.assign(updateData, {content});
    html && Object.assign(updateData, {html});
    if (is_publish !== 'undefined') {
      Object.assign(updateData, {is_publish});
    }
    return await News.update(updateData, {where});
  }

  async getNewsList({limit, offset}) {
    const where = {};
    const res = await News.findAll({
      where,
      limit,
      offset,
    });
    return res ? res : null;
  }
}

module.exports = new NewsService();
