const {
  getLateRecord,
  getAll,
  createStaffDormitoryApply,
  updateStaffDormitoryInfo,
  getStaffDormitoryInfo,
  del
} = require("../service/dormitory.service");

class DormitoryController {

  async del(ctx) {
    const data = ctx.request.body;
    const res = await del(data);
    ctx.body = {
      code: 200,
      message: '删除成功',
      result: res,
    }
  }

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
    const { keyWord } = ctx.query;
    const res = await getAll({ keyWord });
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
    const res = await getAll({keyWord: ''});
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

  async getStaffDormitoryInfoByKeyWord(ctx) {
    const { keyWord } = ctx.query;
    const res = await getAll({ keyWord });
    ctx.body = {
      code: 200,
      message: "审核成功",
      result: res,
    };
  }
}

module.exports = new DormitoryController();
