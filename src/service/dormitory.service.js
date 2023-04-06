const Dormitory = require("../model/dormitory.model");

class DormitoryService {
  async createStaffDormitoryApply({
    code,
    pre_dormitory,
    new_dormitory,
    reason,
    name,
  }) {
    const res = await Dormitory.create({
      code,
      pre_dormitory,
      new_dormitory,
      reason,
      name,
    });
    return res ? res.dataValues : null;
  }

  async getLateRecord({ code }) {
    const res = await Dormitory.findOne({
      where: {
        code,
        status: 0,
      },
    });
    return res ? res.dataValues : null;
  }

  async getStaffDormitoryInfo({code}) {
    const res = await Dormitory.findAll({
      where: {
        code,
      },
      attributes: [
        "id",
        "name",
        "status",
        "pre_dormitory",
        "new_dormitory",
        "reason",
        "status",
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
    const res = await Dormitory.findAll({
      where,
      attributes: [
        "id",
        "name",
        "status",
        "pre_dormitory",
        "new_dormitory",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    // console.log('res: ',);
    return res ? res : null;
  }

  async updateStaffDormitoryInfo({ code, status, id }) {
    const where = {};
    code && Object.assign(where, { code });
    id && Object.assign(where, { id });
    const updateData = {};
    status && Object.assign(updateData, { status });
    const res = await Dormitory.update(updateData, { where });
    return res;
  }
}

module.exports = new DormitoryService();
