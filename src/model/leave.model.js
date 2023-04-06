const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Leave = seq.define("leave", {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: "员工姓名",
  },
  entry_time: {
    type: DataTypes.STRING(100),
    comment: "入职时间",
  },
  department: {
    type: DataTypes.CHAR(40),
    comment: "员工所在部门",
  },
  job: {
    type: DataTypes.CHAR(40),
    comment: "员工职位",
  },
  reason: {
    type: DataTypes.TEXT,
    comment: "申请缘由",
  },
  status: {
    type: DataTypes.TINYINT,
    comment: "审核状态",
    defaultValue: 0,
  },
});

Leave.sync();

module.exports = Leave;
