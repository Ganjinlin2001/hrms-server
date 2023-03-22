const { DataTypes } = require("sequelize");

const seq = require("../db/seq");

const Staff = seq.define('staff', {
  code: {
    type: DataTypes.CHAR(20),
    comment: "员工工号",
  },
  password: {
    type: DataTypes.STRING,
    comment: '员工登录密码',
  },
  name: {
    type: DataTypes.CHAR(20),
    comment: '员工姓名',
  },
  gender: {
    type: DataTypes.TINYINT,
    comment: '员工性别',
  },
  birthday: {
    type: DataTypes.CHAR(60),
    comment: '员工生日',
  },
  id_number: {
    type: DataTypes.STRING(100),
    comment: '员工身份证号'
  },
  avatar: {
    type: DataTypes.STRING,
    comment: '员工头像链接',
  },
  dormitory: {
    type: DataTypes.CHAR(60),
    comment: '员工宿舍号'
  },
  phone: {
    type: DataTypes.CHAR(11),
    comment: '员工电话号码',
  },
  email: {
    type: DataTypes.STRING(100),
    comment: '员工邮箱'
  },
  emergency_contact_person: {
    type: DataTypes.CHAR(20),
    comment: '员工紧急联系人',
  },
  emergency_contact_phone: {
    type: DataTypes.CHAR(11),
    comment: "员工紧急联系人电话",
  },
  home_address: {
    type: DataTypes.STRING,
    comment: '员工家庭地址'
  },
  school: {
    type: DataTypes.STRING(100),
    comment: '员工毕业院校'
  },
  school_address: {
    type: DataTypes.STRING,
    comment: '员工毕业院校地址'
  },
  edu_bg: {
    type: DataTypes.CHAR(20),
    comment: '员工学历'
  },
  major: {
    type: DataTypes.CHAR(40),
    comment: '员工毕业专业'
  },
  job: {
    type: DataTypes.CHAR(40),
    comment: '员工职位'
  },
  department: {
    type: DataTypes.CHAR(40),
    comment: '员工所在部门'
  },
  pro_skills: {
    type: DataTypes.TEXT,
    comment: '员工技能'
  },
  work_experience: {
    type: DataTypes.TEXT,
    comment: '员工工作经历'
  },
  campus_experience: {
    type: DataTypes.TEXT,
    comment: '员工校园经历'
  },
  project_experience: {
    type: DataTypes.TEXT,
    comment: '员工项目经历'
  },
  basic_salary: {
    type: DataTypes.CHAR(20),
    comment: '员工基本薪资'
  },
  labor_contract: {
    type: DataTypes.STRING,
    comment: '劳动合同照片链接'
  },
  apply_status: {
    type: DataTypes.TINYINT,
    comment: '员工申请状态，0-待审核，1-审核通过，不通过的申请将会被删除，默认值是 0',
    defaultValue: 0
  },
  service_status: {
    type: DataTypes.TINYINT,
    comment: '员工状态，是否在职，0-离职，1-在职',
    defaultValue: 1,
  },
})

Staff.sync();

module.exports = Staff;