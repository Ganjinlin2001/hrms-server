const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const News = seq.define('news', {
  article_id: {
    type: DataTypes.CHAR(30),
    comment: '文章id',
  },
  title: {
    type: DataTypes.STRING(100),
    comment: '文章标题',
  },
  cover: {
    type: DataTypes.STRING,
    comment: '文章封面',
  },
  brief: {
    type: DataTypes.STRING,
    comment: '文章简介'
  },
  content: {
    type: DataTypes.TEXT,
    comment: '文章 md 正文内容'
  },
  html: {
    type: DataTypes.TEXT,
    comment: '文章的 html 正文内容'
  },
  is_publish: {
    type: DataTypes.BOOLEAN,
    comment: '文章是否发布',
    defaultValue: false,
  }
})

// News.sync({force: true});
News.sync();

module.exports = News;