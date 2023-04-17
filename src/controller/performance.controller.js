const {
  createStaffPerformance,
  getAll,
  updateStaffPerformance,
} = require("../service/performance.service");

class PerformanceController {
  async addPerformance(ctx) {
    const { code, name, department, job, basic_salary, year, month } =
      ctx.request.body;
    const res = await createStaffPerformance({
      code,
      name,
      department,
      job,
      basic_salary,
      year,
      month,
    });
    ctx.body = {
      code: 200,
      message: "创建成功",
      result: null,
    };
  }

  async getStaffAllPerformanceList(ctx) {
    const { code } = ctx.query;
    const res = await getAll({ code });
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async getAllStaffPerformance(ctx) {
    const { code, year, month } = ctx.query;
    const res = await getAll({ code, year, month });
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async updateStaffPerformance(ctx) {
    const {
      code,
      year,
      month,
      performance,
      reward,
      reward_salary,
      real_salary,
    } = ctx.request.body;
    const res = await updateStaffPerformance({
      code,
      year,
      month,
      performance,
      reward,
      reward_salary,
      real_salary,
    });
    ctx.body = {
      code: 200,
      message: "修改成功",
      result: res,
    };
  }

  async searchPerformance(ctx) {
    const { code, year, month } = ctx.query;
    const res = await getAll({ code, year, month });
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }
}

module.exports = new PerformanceController();
