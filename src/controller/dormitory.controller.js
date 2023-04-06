const {
  getLateRecord,
  getAll,
  createStaffDormitoryApply,
  updateStaffDormitoryInfo,
  getStaffDormitoryInfo,
} = require("../service/dormitory.service");

class DormitoryController {
  async addStaffDormitoryApply(ctx) {
    const { code, pre_dormitory, new_dormitory, reason, name } =
      ctx.request.body;
    // 创建一条员工调岗申请记录
    const res = await createStaffDormitoryApply({
      code,
      pre_dormitory,
      new_dormitory,
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

  async getLateRecord(ctx) {
    const { code } = ctx.query;
    const res = await getLateRecord({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async getStaffAllDormitoryRocord(ctx) {
    const { code } = ctx.query;
    const res = await getAll({ code });
    console.log('res: ', res);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async cancelStaffDormitoryApply(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffDormitoryInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "取消成功",
      result: res,
    };
  }

  async getAllStaffDormitoryRecord(ctx) {
    const res = await getAll({});
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async getStaffDormitoryInfoByCode(ctx) {
    const { code } = ctx.query;
    const res = await getStaffDormitoryInfo({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async updateStaffDormitoryInfoByCode(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffDormitoryInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "审核成功",
      result: res,
    };
  }
}

module.exports = new DormitoryController();
