const {
  getStaffLateRecord,
  getAll,
  createStaffVacateApply,
  updateStaffVacateInfo,
  getStaffVacateInfo,
  del,
} = require("../service/vacate.service");

class VacateController {
  async del(ctx) {
    const data = ctx.request.body;
    const res = await del(data);
    ctx.body = {
      code: 200,
      message: "删除成功",
      result: res,
    };
  }

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

  async getStaffVacateInfoByKeyWord(ctx) {
    const { keyWord } = ctx.query;
    const res = await getStaffVacateInfo({ keyWord });
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
