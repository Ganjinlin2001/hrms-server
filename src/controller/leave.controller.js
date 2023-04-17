const {
  getLateRecord,
  createStaffLeaveApply,
  updateStaffLeaveInfo,
  getStaffLeaveInfo,
  getAll,
  passStaffLeave,
} = require("../service/leave.service");

const { getStaffInfo } = require("../service/staff.service");

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
    const {
      code,
      status,
      id,
      leave_html,
      signature_img,
      sign_date,
      signature_img_a,
      pdf_base64_string,
      sign_date_a,
    } = ctx.request.body;
    const res = await updateStaffLeaveInfo({
      code,
      status,
      id,
      leave_html,
      signature_img,
      sign_date,
      signature_img_a,
      pdf_base64_string,
      sign_date_a
    });
    // console.log('返回成功信息');
    ctx.body = {
      code: 200,
      message: "成功",
      result: "",
    };
  }

  // 获取员工的身份证信息和电话号码
  async getStaffInfo(ctx) {
    const { code } = ctx.query;
    const res = await getStaffInfo({ code });
    ctx.body = {
      code: 200,
      message: "",
      result: res,
    };
  }

  // 通过员工的离职审批
  // async passStaffLeave(ctx) {
  //   const { code, status } = ctx.request.body;
  //   const res = await passStaffLeave({code, status});
  //   ctx.body = {
  //     code: 200,
  //     message: "审批成功",
  //     result: res,
  //   };
  // }
}

module.exports = new LeaveController();
