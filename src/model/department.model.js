const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Department = seq.define('department', {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  pre_department: {
    type: DataTypes.STRING(100),
    comment: "原来的宿舍",
  },
  new_department: {
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

Department.sync();

module.exports = Department;