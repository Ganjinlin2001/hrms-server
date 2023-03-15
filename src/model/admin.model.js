const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

// 创建模型
const Admin = seq.define("admin", {
  code: {
    type: DataTypes.CHAR(20),
    comment: "管理员工号",
  },
  email: {
    type: DataTypes.STRING(100),
    comment: "账号名，默认使用注册的邮箱作为账号名称",
  },
  password: {
    type: DataTypes.STRING,
    comment: "登录密码",
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: "用户名，真实姓名",
  },
  gender: {
    type: DataTypes.TINYINT,
    comment: "性别，0-女，1-男",
  },
  age: {
    type: DataTypes.TINYINT,
    comment: "年龄",
  },
  phone: {
    type: DataTypes.CHAR(11),
    comment: "电话号码",
  },
  avatar: {
    type: DataTypes.STRING(200),
    comment: "管理员头像链接",
    defaultValue:
      "https://6872-hrms-env-9gxu769jef44e565-1317210907.tcb.qcloud.la/avatar/default_avatar.png?sign=5c52d13691b2d0590226c4071f5f244b&t=1678677197",
  },
  department: {
    type: DataTypes.CHAR(20),
    comment: "管理员所在部门的 id",
    defaultValue: "人事部", // 默认是人事部
  },
  service_status: {
    type: DataTypes.TINYINT,
    comment: "管理员状态，是否在职，0-离职，1-在职",
    defaultValue: 1,
  },
  is_super: {
    type: DataTypes.DOUBLE,
    comment:
      "是否是超级管理员，超级管理员是系统管理员，拥有管理员的所有权限，以及管理其他管理员的权限，比如审批新管理员的申请，设置管理员的在职、离职状态，删除管理员等，0-否，1-是，默认是 0",
    defaultValue: false,
  },
  apply_status: {
    type: DataTypes.TINYINT,
    comment:
      "管理员申请状态，0-待审核，1-审核通过，2-审核不通过，该字段只能由系统管理员进行更新",
    defaultValue: 0,
  },
});

Admin.sync();

module.exports = Admin;
