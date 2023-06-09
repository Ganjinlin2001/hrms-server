const Department = require("../model/department.model");

class DepartmentService {

  async del(data) {
    const id = data instanceof Array ? data.map(i => i.id) : data.id;
    return await Department.destroy({
      where: {
        id,
      }
    })
  }

  async getAll({ code }) {
    const where = {};
    code && Object.assign(where, { code });
    const res = await Department.findAll({
      order: [['id', 'DESC']],
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
      order: [['id', 'DESC']],
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
            pre_department: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            new_department: {
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
