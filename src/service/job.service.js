const Job = require("../model/job.model");
const { Op } = require("sequelize");
class JobService {
  async del(data) {
    const id = data instanceof Array ? data.map((i) => i.id) : data.id;
    return await Job.destroy({
      where: {
        id,
      },
    });
  }

  async createStaffJobApply({ code, name, pre_job, new_job, reason }) {
    const res = await Job.create({
      code,
      pre_job,
      new_job,
      reason,
      name,
    });
    return res ? res.dataValues : null;
  }

  async getLateRecord({ code }) {
    const res = await Job.findOne({
      where: {
        code,
        status: 0,
      },
    });
    return res ? res.dataValues : null;
  }

  async updateStaffJob({ code, status, id }) {
    const where = {};
    code && Object.assign(where, { code });
    id && Object.assign(where, { id });
    const updateData = {};
    status && Object.assign(updateData, { status });
    const res = await Job.update(updateData, { where });
    return res;
  }

  async getAll({ code }) {
    const where = {};
    code && Object.assign(where, { code });
    const res = await Job.findAll({
      order: [["id", "DESC"]],
      where,
      attributes: [
        "id",
        "name",
        "status",
        "pre_job",
        "new_job",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    // console.log('res: ',);
    return res ? res : null;
  }

  async getStaffJobInfo({ keyWord }) {
    const res = await Job.findAll({
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
            pre_job: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            new_job: {
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
        "pre_job",
        "new_job",
        "reason",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    return res ? res : null;
  }
}

module.exports = new JobService();
