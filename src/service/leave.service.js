const Leave = require("../model/leave.model");

const {updateStaffInfo} = require('../service/staff.service');

class LeaveService {
  async getLateRecord({ code }) {
    const res = await Leave.findOne({
      where: {
        code,
        status: 0,
      },
    });
    return res ? res.dataValues : null;
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

  async updateStaffLeaveInfo({code, id, status}) {
    const where = {};
    code && Object.assign(where, { code });
    id && Object.assign(where, { id });
    const updateData = {};
    status && Object.assign(updateData, { status });
    const res = await Leave.update(updateData, { where });
    // 更新用户的个人信息
    const res2 = await updateStaffInfo({code, service_status: 0});
    console.log('res2: ', res2);
    return res;
  }

  async getStaffLeaveInfo({code}) {
    const res = await Leave.findAll({
      where: {
        code,
      },
      attributes: [
        "id",
        "name",
        "status",
        "department",
        "job",
        "reason",
        "entry_time",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    return res ? res : null;
  }

  async getAll({ code }) {
    const where = {};
    code && Object.assign(where, { code });
    const res = await Leave.findAll({
      where,
      attributes: [
        "id",
        "name",
        "status",
        "department",
        "job",
        "reason",
        "entry_time",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    // console.log('res: ',);
    return res ? res : null;
  }
}

module.exports = new LeaveService();
