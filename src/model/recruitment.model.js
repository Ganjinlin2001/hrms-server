const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Recruitment = seq.define('recruitment', {
  name: {
    type: DataTypes.CHAR(20),
    comment: '岗位名称',
  },
  salary: {
    type: DataTypes.CHAR(50),
    comment: '岗位薪资'
  },
  city: {
    type: DataTypes.CHAR(20),
    comment: '工作地点'
  },
  experiece: {
    type: DataTypes.CHAR(20),
    comment: '工作经验'
  },
  degree: {
    type: DataTypes.CHAR(20),
    comment: '学历要求'
  },
  desc: {
    type: DataTypes.TEXT,
    comment: '职位描述'
  }
});

Recruitment.sync();

module.exports = Recruitment;