const News = require("../model/news.model");
const { Op } = require("sequelize");
class NewsService {
  async getArticleInfo({ article_id }) {
    const where = {};
    article_id && Object.assign(where, { article_id });
    const res = await News.findOne({ where });
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
    article_id && Object.assign(where, { article_id });
    cover && Object.assign(updateData, { cover });
    title && Object.assign(updateData, { title });
    brief && Object.assign(updateData, { brief });
    content && Object.assign(updateData, { content });
    html && Object.assign(updateData, { html });
    if (is_publish !== "undefined") {
      Object.assign(updateData, { is_publish });
    }
    return await News.update(updateData, { where });
  }

  async getNewsList({ limit, offset }) {
    const where = {};
    const res = await News.findAndCountAll({
      where,
      limit,
      offset,
    });
    return res ? res : null;
  }

  async staffGetNewsList() {
    const res = await News.findAll({
      where: {
        is_publish: true,
      },
    });
    return res ? res : null;
  }

  async delArticle(data) {
    const article_id =
      data instanceof Array ? data.map((i) => i.article_id) : data.article_id;
    return await News.destroy({
      where: {
        article_id,
      },
    });
  }

  async searchNewsByKeyWord({ keyWord }) {
    return await News.findAndCountAll({
      where: {
        [Op.or]: [
          {
            content: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            title: {
              [Op.like]: `%${keyWord}%`,
            },
          },
        ],
      },
    });
  }
}

module.exports = new NewsService();
