const Dormitory = require("../model/dormitory.model");

const { Op } = require("sequelize");

class DormitoryService {

  async del(data) {
    const id = data instanceof Array ? data.map(i => i.id) : data.id;
    return await Dormitory.destroy({
      where: {
        id,
      }
    })
  }

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

  async getStaffDormitoryInfo({ code }) {
    const res = await Dormitory.findAll({
      order: [['id', 'DESC']],
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

  async getAll({ keyWord }) {
    let where = {};
    // code && Object.assign(where, { code });
    if (keyWord !== undefined) {
      where = {
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
            pre_dormitory: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            new_dormitory: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            reason: {
              [Op.like]: `%${keyWord}%`,
            },
          },
        ],
      };
    }
    const res = await Dormitory.findAll({
      order: [['id', 'DESC']],
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
