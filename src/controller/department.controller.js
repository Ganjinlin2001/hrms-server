const {
  getAll,
  getLateRecord,
  createStaffDepartmentApply,
  updateStaffDepartmentInfo,
  getStaffDepartmentInfo,
} = require("../service/department.service");

class DepartmentController {
  async getStaffAllDepartmentRocord(ctx) {
    const { code } = ctx.query;
    const res = await getAll({ code });
    console.log("res: ", res);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
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

  async addStaffDepartmentApply(ctx) {
    const { code, pre_department, new_department, reason, name } =
      ctx.request.body;
    // 创建一条员工调岗申请记录
    const res = await createStaffDepartmentApply({
      code,
      pre_department,
      new_department,
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

  async cancelStaffDepartmentApply(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffDepartmentInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "取消成功",
      result: res,
    };
  }

  async getAllStaffDepartmentRecord(ctx) {
    const res = await getAll({});
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async getStaffDepartmentInfoByCode(ctx) {
    const { code } = ctx.query;
    const res = await getStaffDepartmentInfo({ code });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async updateStaffDepartmentInfoByCode(ctx) {
    const { code, status, id } = ctx.request.body;
    const res = await updateStaffDepartmentInfo({ code, status, id });
    ctx.body = {
      code: 200,
      message: "审核成功",
      result: res,
    };
  }
}

module.exports = new DepartmentController();
