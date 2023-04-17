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

  async getAll({ code, year, month }) {
    const where = {};
    code && Object.assign(where, { code });
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
    };
    return await Performance.update(updateData, { where });
  }
}

module.exports = new PerformanceService();
