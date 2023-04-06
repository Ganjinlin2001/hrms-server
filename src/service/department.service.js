const Department = require("../model/department.model");

class DepartmentService {
  async getAll({ code }) {
    const where = {};
    code && Object.assign(where, { code });
    const res = await Department.findAll({
      where,
      attributes: [
        "id",
        "name",
        "status",
        "pre_department",
        "new_department",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    // console.log('res: ',);
    return res ? res : null;
  }

  async getLateRecord({ code }) {
    const res = await Department.findOne({
      where: {
        code,
        status: 0,
      },
    });
    return res ? res.dataValues : null;
  }


  async createStaffDepartmentApply({ code, pre_department, new_department, reason, name }) {
    const res = await Department.create({
      code,
      pre_department,
      new_department,
      reason,
      name,
    });
    return res ? res.dataValues : null;
  }

  async updateStaffDepartmentInfo({ code, status, id }) {
    const where = {};
    id && Object.assign(where, {id});
    code && Object.assign(where, { code });
    const updateData = {};
    status && Object.assign(updateData, { status });
    const res = await Department.update(updateData, { where });
    return res;
  }

  async getStaffDepartmentInfo({code}) {
    const res = await Department.findAll({
      where: {
        code,
      },
      attributes: [
        "id",
        "name",
        "status",
        "pre_department",
        "new_department",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    return res ? res : null;
  }
}

module.exports = new DepartmentService();
