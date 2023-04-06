const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Dormitory = seq.define('dormitory', {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  pre_dormitory: {
    type: DataTypes.STRING(100),
    comment: "原来的宿舍",
  },
  new_dormitory: {
    type: DataTypes.STRING(100),
    comment: "申请的新宿舍"
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

Dormitory.sync();

module.exports = Dormitory;