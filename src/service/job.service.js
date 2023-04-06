const Job = require("../model/job.model");

class JobService {
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

  async getStaffJobInfo({ code }) {
    const res = await Job.findAll({
      where: {
        code,
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
