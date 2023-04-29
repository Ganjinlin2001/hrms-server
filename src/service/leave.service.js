const { Op } = require("sequelize");

const Leave = require("../model/leave.model");

const { updateStaffInfo } = require("../service/staff.service");

class LeaveService {
  async del(data) {
    const id = data instanceof Array ? data.map((i) => i.id) : data.id;
    return await Leave.destroy({
      where: {
        id,
      },
    });
  }

  async getLateRecord({ code }) {
    const res = await Leave.findAll({
      order: [["id", "DESC"]],
      where: {
        code,
      },
    });
    return res ? res : null;
  }

  async createStaffLeaveApply({
    code,
    name,
    department,
    job,
    entry_time,
    reason,
  }) {
    const res = await Leave.create({
      code,
      name,
      department,
      job,
      entry_time,
      reason,
    });
    return res ? res.dataValues : null;
  }

  async updateStaffLeaveInfo({
    code,
    id,
    status,
    leave_html,
    signature_img,
    sign_date,
    signature_img_a,
    pdf_base64_string,
    sign_date_a,
  }) {
    // console.log("水水水水",{ code, id, status, leave_html });
    const where = {};
    code && Object.assign(where, { code });
    id && Object.assign(where, { id });
    const updateData = {};
    if (status !== "undefined") {
      Object.assign(updateData, { status });
    }
    leave_html && Object.assign(updateData, { leave_html });
    signature_img && Object.assign(updateData, { signature_img });
    sign_date && Object.assign(updateData, { sign_date });
    signature_img_a && Object.assign(updateData, { signature_img_a });
    sign_date_a && Object.assign(updateData, { sign_date_a });
    const res = await Leave.update(updateData, { where });
    // 更新用户的个人信息
    console.log("pdf_base64_string: ", pdf_base64_string == undefined);
    if (pdf_base64_string !== undefined) {
      await updateStaffInfo({ code, service_status: 0 });
    }
    // console.log("res2: ", res2);
    return res;
  }

  async getStaffLeaveInfo({ keyWord }) {
    const res = await Leave.findAll({
      order: [["id", "DESC"]],
      where: {
        [Op.or]: [
          {
            code: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            job: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            department: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            reason: {
              [Op.like]: `%${keyWord}%`,
            },
          },
        ],
      },
    });
    return res ? res : null;
  }

  async getAll({ code }) {
    const where = {};
    code && Object.assign(where, { code });
    const res = await Leave.findAll({
      order: [["id", "DESC"]],
      where,
    });
    // console.log('res: ',);
    return res ? res : null;
  }

  // 通过员工的离职申请
  async passStaffLeave({ code }) {}
}

module.exports = new LeaveService();
