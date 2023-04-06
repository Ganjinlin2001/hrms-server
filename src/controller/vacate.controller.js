const {
  getStaffLateRecord,
  getAll,
  createStaffVacateApply,
  updateStaffVacateInfo,
  getStaffVacateInfo,
} = require("../service/vacate.service");

class VacateController {
  async getStaffLateRecord(ctx) {
    const { code } = ctx.query;
    const res = await getStaffLateRecord({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async getStaffAllVacateRecord(ctx) {
    const { code } = ctx.query;
    const res = await getAll({ code });
    console.log("res: ", res);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async addStaffVacateApply(ctx) {
    const { start_time, end_time, code, name, reason } = ctx.request.body;
    // 创建一条员工调岗申请记录
    const res = await createStaffVacateApply({
      start_time,
      end_time,
      code,
      name,
      reason,
    });
    ctx.body = {
      code: 200,
      message: "提交成功",
      result: res,
      status: 1,
    };
  }

  async cancelVacateApply(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffVacateInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "取消成功",
      result: res,
    };
  }

  async getAllStaffVacateRecord(ctx) {
    const res = await getAll({});
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async getStaffVacateInfoByCode(ctx) {
    const { code } = ctx.query;
    const res = await getStaffVacateInfo({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async updateStaffVacateInfoByCode(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffVacateInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "审核成功",
      result: res,
    };
  }
}

module.exports = new VacateController();
