const {
  getLateRecord,
  createStaffLeaveApply,
  updateStaffLeaveInfo,
  getStaffLeaveInfo,
  getAll,
} = require("../service/leave.service");

class LeaveController {
  async getLateRecord(ctx) {
    const { code } = ctx.query;
    const res = await getLateRecord({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async addStaffLeaveApply(ctx) {
    const { code, name, department, job, entry_time, reason } =
      ctx.request.body;
    // 创建一条员工调岗申请记录
    const res = await createStaffLeaveApply({
      code,
      name,
      department,
      job,
      entry_time,
      reason,
    });
    ctx.body = {
      code: 200,
      message: "提交成功",
      result: res,
      status: 1,
    };
  }

  async cancelStaffLeaveApply(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffLeaveInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "取消成功",
      result: res,
    };
  }

  async getAllStaffLeaveRecord(ctx) {
    const res = await getAll({});
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async getStaffLeaveInfoByCode(ctx) {
    const { code } = ctx.query;
    const res = await getStaffLeaveInfo({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async updateStaffLeaveInfoByCode(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffLeaveInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "审核成功",
      result: res,
    };
  }
}

module.exports = new LeaveController();
