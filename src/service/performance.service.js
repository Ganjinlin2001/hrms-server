const { Op } = require("sequelize");

const Performance = require("../model/performance.model");

class PerformanceService {
  async getStaffPerformanceInfo({ code, year, month }) {
    const where = {};
    code && Object.assign(where, { code });
    year && Object.assign(where, { year });
    month && Object.assign(where, { month });
    return await Performance.findOne({
      where,
    });
  }

  // 创建一条员工的绩效记录
  async createStaffPerformance({
    code,
    name,
    department,
    job,
    basic_salary,
    year,
    month,
  }) {
    return await Performance.create({
      code,
      name,
      department,
      job,
      basic_salary,
      year,
      month,
    });
  }

  async getAll({ keyWord, year, month }) {
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
            job: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            basic_salary: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            performance: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            department: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            reward: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            reward_salary: {
              [Op.like]: `%${keyWord}%`,
            },
          },
        ],
      }
    }
    year && Object.assign(where, { year });
    month && Object.assign(where, { month });
    return await Performance.findAndCountAll({ where });
  }

  async updateStaffPerformance({
    code,
    year,
    month,
    performance,
    reward,
    reward_salary,
    real_salary,
    performance_salary
  }) {
    const where = {
      code,
      year,
      month,
    };
    const updateData = {
      performance,
      reward,
      reward_salary,
      real_salary,
      performance_salary
    };
    return await Performance.update(updateData, { where });
  }
}

module.exports = new PerformanceService();
