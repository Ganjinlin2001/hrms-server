const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Vacate = seq.define('vacate', {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  start_time: {
    type: DataTypes.STRING(100),
    comment: "开始的时间",
  },
  end_time: {
    type: DataTypes.STRING(100),
    comment: "开始的时间",
  },
  reason: {
    type: DataTypes.TEXT,
    comment: '请假原因'
  },
  status: {
    type: DataTypes.TINYINT,
    comment: '审核状态',
    defaultValue: 0,
  },
})

Vacate.sync();

module.exports = Vacate;