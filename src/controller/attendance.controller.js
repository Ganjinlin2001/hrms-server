const {
  getAll,
  getStaffAttendanceInfo,
  createStaffAttendanceRecord,
  updateStaffAttendanceInfo,
  del
} = require("../service/attendance.service");

class AttendanceController {

  async del(ctx) {
    const data = ctx.request.body;
    const res = await del(data);
    ctx.body = {
      code: 200,
      message: '删除成功',
      result: res,
    }
  }

  async getStaffAllAttendanceRecord(ctx) {
    const { keyWord } = ctx.query;
    const res = await getAll({ keyWord });
    // console.log("res: ", res);
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async getStaffTodayAttendanceRecord(ctx) {
    const { code, date } = ctx.query;
    const res = await getStaffAttendanceInfo({ code, date });
    ctx.body = {
      code: 200,
      message: "获取成功",
      result: res,
    };
  }

  async addStaffAttendanceRecord(ctx) {
    const { code, name, department, job, date, start_work_time } =
      ctx.request.body;
    const res = await createStaffAttendanceRecord({
      code,
      name,
      department,
      job,
      date,
      start_work_time,
    });
    ctx.body = {
      code: 200,
      message: "打卡成功",
      result: res,
    };
  }

  async updateStaffAttendanceInfo(ctx) {
    const { code, id, start_work_time, end_work_time, on_work_time, state } = ctx.request.body;
    const res = await updateStaffAttendanceInfo({
      code,
      id,
      start_work_time,
      end_work_time,
      on_work_time,
      state
    });
    ctx.body = {
      code: 200,
      message: "打卡成功",
      result: res,
    };
  }

  async getAllStaffAttendanceRecord(ctx) {
    const res = await getAll({});
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }

  async searchAttendanceInfoByKeyWord(ctx) {
    const { keyWord } = ctx.query;
    const res = await getAll({ keyWord });
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: res,
    };
  }
}

module.exports = new AttendanceController();
