const {
  getAll,
  getStaffAttendanceInfo,
  createStaffAttendanceRecord,
  updateStaffAttendanceInfo,
} = require("../service/attendance.service");

class AttendanceController {
  async getStaffAllAttendanceRecord(ctx) {
    const { code } = ctx.query;
    const res = await getAll({ code });
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
    const { code, id, end_work_time, on_work_time, state } = ctx.request.body;
    const res = await updateStaffAttendanceInfo({
      code,
      id,
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
}

module.exports = new AttendanceController();
