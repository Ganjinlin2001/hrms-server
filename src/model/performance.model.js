const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Performance = seq.define('performance', {
  /* 
    员工工号
    年份和月份
      员工登录小程序之后自动按照年份和月份创建，如果已经创建过了就不再创建
    基础工资
    绩效
      分为 A B C，对应不同的绩效工资
      - A：30%
      - B：20%
      - C：10%（没有绩效工资）
    奖惩
      可以根据员工上班考勤情况设置全勤奖等
    实发工资
      基础工资加上绩效工资加上或减去奖惩的工资
  */
  code: {
    type: DataTypes.CHAR(20),
    comment: '员工工号'
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  department: {
    type: DataTypes.CHAR(40),
    comment: "员工所在部门",
  },
  job: {
    type: DataTypes.CHAR(40),
    comment: "员工职位",
  },
  basic_salary: {
    type: DataTypes.CHAR(20),
    comment: '员工基本薪资'
  },
  year: {
    type: DataTypes.CHAR(20),
    comment: "创建的年份",
  },
  month: {
    type: DataTypes.CHAR(20),
    comment: "创建的月份"
  },
  performance: {
    type: DataTypes.CHAR(10),
    comment: '绩效等级'
  },
  performance_salary: {
    type: DataTypes.INTEGER,
    comment: '绩效工资'
  },
  reward: {
    type: DataTypes.STRING,
    comment: '奖励与惩罚，由管理员设置，可以根据奖惩情况增加或者扣除工资',
  },
  reward_salary: {
    type: DataTypes.INTEGER,
    comment: '奖惩工资'
  },
  real_salary: {
    type: DataTypes.CHAR(20),
    comment: '实发工资，基础工资加上绩效工资加上或减去奖惩的工资'
  }
});

Performance.sync();

module.exports = Performance;