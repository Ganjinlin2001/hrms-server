const Vacate = require("../model/vacate.model");
const { Op } = require("sequelize");
class VacateService {
  async del(data) {
    const id = data instanceof Array ? data.map(i => i.id) : data.id;
    return await Vacate.destroy({
      where: {
        id,
      }
    })
  }

  async getStaffLateRecord({ code }) {
    const res = await Vacate.findOne({
      where: {
        code,
        status: 0,
      },
    });
    return res ? res.dataValues : null;
  }

  async getAll({ code }) {
    const where = {};
    code && Object.assign(where, { code });
    const res = await Vacate.findAll({
      order: [['id', 'DESC']],
      where,
      attributes: [
        "id",
        "name",
        "status",
        "start_time",
        "end_time",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    return res ? res : null;
  }

  async createStaffVacateApply({ start_time, end_time, code, name, reason }) {
    const res = await Vacate.create({
      start_time,
      end_time,
      code,
      name,
      reason,
    });
    return res ? res.dataValues : null;
  }

  async updateStaffVacateInfo({ code, status, id }) {
    const where = {};
    id && Object.assign(where, { id });
    code && Object.assign(where, { code });
    const updateData = {};
    status && Object.assign(updateData, { status });
    const res = await Vacate.update(updateData, { where });
    return res;
  }

  async getStaffVacateInfo({ keyWord }) {
    const where = {
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
          reason: {
            [Op.like]: `%${keyWord}%`,
          },
        },
      ],
    }
    const res = await Vacate.findAll({
      order: [['id', 'DESC']],
      where,
      attributes: [
        "id",
        "name",
        "status",
        "start_time",
        "end_time",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    return res ? res : null;
  }
}

module.exports = new VacateService();
