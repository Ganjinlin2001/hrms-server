const { getStaffPerformanceInfo } = require("../service/performance.service");

const verifyRecordIsExit = async (ctx, next) => {
  const { code, year, month } = ctx.request.body;
  const res = await getStaffPerformanceInfo({ code, year, month });
  if (res) {
    ctx.body = {
      code: 200,
      message: "",
      result: null,
    };
  } else {
    await next();
  }
};

module.exports = {
  verifyRecordIsExit,
}
