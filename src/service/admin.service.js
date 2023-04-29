const Admin = require("../model/admin.model");
const { Op } = require("sequelize");
class AdminService {
  // 创建管理员用户
  async createAdmin({ code, password, name, gender, age, phone, email }) {
    const res = await Admin.create({
      code,
      password,
      name,
      gender,
      age,
      phone,
      email,
    });
    return res ? res.dataValues : null;
  }
  // 获取管理员信息
  async getAdminInfo({ id, code }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    code && Object.assign(whereOpt, { code });
    const res = await Admin.findOne({
      attributes: [
        "id",
        "email",
        "name",
        "gender",
        "age",
        "phone",
        "avatar",
        "department",
        "service_status",
        "is_super",
        "apply_status",
        "password",
        "code",
      ],
      where: whereOpt,
    });
    console.log("res: ", res);
    return res ? res.dataValues : null;
  }

  // 获取管理员列表
  async getAdminList({ keyWord }) {
    const res = await Admin.findAll({
      order: [["id", "DESC"]],
      where: {
        [Op.or]: [
          {
            code: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            name: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            age: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            phone: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            email: {
              [Op.like]: `%${keyWord}%`,
            },
          },
          {
            department: {
              [Op.like]: `%${keyWord}%`,
            },
          },
        ],
      },
      attributes: [
        "id",
        "email",
        "name",
        "gender",
        "age",
        "phone",
        "avatar",
        "department",
        "service_status",
        "is_super",
        "apply_status",
        "code",
      ],
    });
    return res ? res : null;
  }

  // 更新管理员信息
  async updateAdminInfo({
    id,
    code,
    password,
    email,
    name,
    phone,
    avatar,
    department,
    service_status,
    apply_status,
  }) {
    const where = {};
    id && Object.assign(where, { id });
    code && Object.assign(where, { code });
    const updateData = {};
    password && Object.assign(updateData, { password });
    email && Object.assign(updateData, { email });
    name && Object.assign(updateData, { name });
    phone && Object.assign(updateData, { phone });
    avatar && Object.assign(updateData, { avatar });
    department && Object.assign(updateData, { department });
    service_status && Object.assign(updateData, { service_status });
    apply_status && Object.assign(updateData, { apply_status });
    const res = await Admin.update(updateData, { where });
    return res;
  }

  // 删除管理员
  async del(data) {
    const id = data instanceof Array ? data.map((i) => i.id) : data.id;
    return await Dormitory.destroy({
      where: {
        id,
      },
    });
  }
}

module.exports = new AdminService();
