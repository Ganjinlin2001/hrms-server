const {
  createStaffJobApply,
  getLateRecord,
  updateStaffJob,
  getAll,
  getStaffJobInfo,
} = require("../service/job.service");

class JobController {
  async addStaffJobApply(ctx, next) {
    console.log(ctx.request.body);
    const { code, pre_job, new_job, reason, name } = ctx.request.body;
    // 创建一条员工调岗申请记录
    const res = await createStaffJobApply({
      code,
      pre_job,
      new_job,
      reason,
      name,
    });
    ctx.body = {
      code: 200,
      message: "提交成功",
      result: res,
      status: 1,
    };
  }
  async getLateRecord(ctx, next) {
    console.log(ctx.query);
    const { code } = ctx.query;
    const res = await getLateRecord({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async cancelJobApply(ctx, next) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffJob({ code, status, id });
    ctx.body = {
      code: 200,
      message: "取消成功",
      result: res,
    };
  }

  async getStaffAll(ctx, next) {
    console.log(ctx.query);
    const { code } = ctx.query;
    const res = await getAll({ code });
    // console.log('res: ', res);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async getAll(ctx, next) {
    try {
      const res = await getAll({});
      ctx.body = {
        code: 200,
        message: "数据获取成功",
        result: res,
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getStaffJobInfoByCode(ctx) {
    const { code } = ctx.query;
    const res = await getStaffJobInfo({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async updateStaffJobInfoByCode(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffJob({ code, status, id });
    ctx.body = {
      code: 200,
      message: "审核成功",
      result: res,
    };
  }
}

module.exports = new JobController();
