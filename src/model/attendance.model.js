const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Attendance = seq.define('attendance', {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  department: {
    type: DataTypes.STRING(100),
    comment: "员工所在部门",
  },
  job: {
    type: DataTypes.STRING(100),
    comment: "员工岗位"
  },
  date: {
    type: DataTypes.STRING(100),
    comment: '日期，上班打开的时候获取当天日期并更新',
  },
  start_work_time: {
    type: DataTypes.STRING(100),
    comment: '上班打卡时间',
  },
  end_work_time: {
    type: DataTypes.STRING(100),
    comment: '下班打卡时间'
  },
  on_work_time: {
    type: DataTypes.CHAR(20),
    comment: '总工时，下班打卡的时候记录'
  },
  state: {
    type: DataTypes.TINYINT,
    comment: '标记今天是否都完成了上下班打卡，1是完成了上班打卡，2是完成了下班打卡',
  },
})

Attendance.sync();

module.exports = Attendance;