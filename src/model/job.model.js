const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Job = seq.define('job', {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  pre_job: {
    type: DataTypes.STRING(100),
    comment: "原来的职位",
  },
  new_job: {
    type: DataTypes.STRING(100),
    comment: "申请的新职位"
  },
  reason: {
    type: DataTypes.TEXT,
    comment: '申请缘由'
  },
  status: {
    type: DataTypes.TINYINT,
    comment: '审核状态',
    defaultValue: 0,
  },
})

Job.sync();

module.exports = Job;