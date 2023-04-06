const {getArticleInfo} = require('../service/news.service');

// 判断当前文章是否存在
const articleIsExist = async (ctx, next) => {
  const {article_id} = ctx.request.body;
  const res = await getArticleInfo({article_id});
  console.log('查看文章是否存在', res);
  if (res != undefined) {
    ctx.body = {
      code: 200,
      message: '',
      result: res,
    }
  } else {
    await next();
  }
}



module.exports = {
  articleIsExist,
}