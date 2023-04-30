const { Op } = require("sequelize");

const Attendance = require("../model/attendance.model");

class AttendanceService {
  async del(data) {
    const id = data instanceof Array ? data.map((i) => i.id) : data.id;
    return await Attendance.destroy({
      where: {
        id,
      },
    });
  }

  async getAll({ keyWord }) {
    let where = {};
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
            department: {
              [Op.like]: `%${keyWord}%`,
            },
          },
        ],
      };
    }
    // code && Object.assign(where, { code });
    const res = await Attendance.findAll({
      order: [["id", "DESC"]],
      where,
      attributes: [
        "id",
        "name",
        "state",
        "department",
        "job",
        "start_work_time",
        "end_work_time",
        "on_work_time",
        "date",
        "createdAt",
        "updatedAt",
        "code",
      ],
    });
    // console.log('res: ',);
    return res ? res : null;
  }

  async getStaffAttendanceInfo({ code, date }) {
    const where = {};
    code && Object.assign(where, { code });
    date && Object.assign(where, { date });
    const res = await Attendance.findOne({
      where,
    });
    return res ? res.dataValues : null;
  }

  async createStaffAttendanceRecord({
    code,
    name,
    department,
    job,
    date,
    start_work_time,
  }) {
    const res = await Attendance.create({
      code,
      name,
      department,
      job,
      date,
      start_work_time,
      state: 1,
    });
    return res ? res.dataValues : null;
  }

  async updateStaffAttendanceInfo({
    code,
    id,
    start_work_time,
    end_work_time,
    on_work_time,
    state,
  }) {
    const where = {};
    code && Object.assign(where, { code });
    id && Object.assign(where, { id });
    const updateData = {};
    start_work_time && Object.assign(updateData, { start_work_time });
    end_work_time && Object.assign(updateData, { end_work_time });
    on_work_time && Object.assign(updateData, { on_work_time });
    state && Object.assign(updateData, { state });
    const res = await Attendance.update(updateData, { where });
    return res;
  }
}

module.exports = new AttendanceService();
