const jwt = require("jsonwebtoken");

const { JWT_SECRET } = require("../config/config.default");

const {
  getAdminInfo,
  createAdmin,
  getAdminList,
  updateAdminInfo,
  deleteAdminById,
} = require("../service/admin.service");

class Admin {
  // 管理员注册
  async register(ctx, next) {
    // 获取前端传递过来的参数
    console.log("ctx.request.body: ", ctx.request.body);
    const { code, password, name, gender, age, phone, email } =
      ctx.request.body;
    const res = await createAdmin({
      code,
      password,
      name,
      gender,
      age,
      phone,
      email,
    });
    ctx.body = {
      code: 200,
      message: "注册成功",
      result: null,
    };
  }

  // 验证当前管理员是否注册
  async checkAdminCode(ctx, next) {
    const { code } = ctx.request.body;
    console.log("code: ", code);
    const res = await getAdminInfo({ code });
    if (res === null) {
      // ctx.body = {
      //   code: 200,
      //   message: "当前工号没有被注册过管理员，可以使用",
      //   result: true,
      // };
      await next();
    } else {
      ctx.body = {
        code: 1001,
        message: "当前管理员工号已经被注册",
        result: false,
      };
    }
  }

  // 管理员登录
  async login(ctx, next) {
    const { code, password } = ctx.request.body;
    const {
      id,
      email,
      name,
      gender,
      age,
      phone,
      avatar,
      department,
      service_status,
      is_super,
      apply_status,
    } = await getAdminInfo({ code });
    ctx.body = {
      code: 200,
      message: "登录成功",
      result: {
        token: jwt.sign(
          {
            id,
            email,
            name,
            is_super,
          },
          JWT_SECRET,
          {
            expiresIn: "1d",
          }
        ),
        userInfo: {
          code,
          id,
          email,
          name,
          gender,
          age,
          phone,
          avatar,
          department,
          service_status,
          is_super,
          apply_status,
        },
      },
    };
  }

  async getAdminInfo(ctx, next) {
    // const id = 1;
    const { keyWord } = ctx.query;
    // console.log("code: ", { code });
    const res = await getAdminList({ keyWord });
    ctx.body = {
      code: 200,
      message: "请求成功",
      result: res,
    };
  }

  // 获取管理员列表
  async getAdminList(ctx, next) {
    const res = await getAdminList({keyWord: ''});
    // console.log('res: ', res);
    ctx.body = {
      code: 200,
      message: "请求成功",
      result: res,
    };
  }

  // 更新管理员信息
  async update(ctx, next) {
    const {
      id,
      email,
      name,
      phone,
      avatar,
      department,
      service_status,
      apply_status,
    } = ctx.request.body;
    // console.log({id, email, name, phone, avatar, department, service_status, apply_status});
    const res = await updateAdminInfo({
      id,
      email,
      name,
      phone,
      avatar,
      department,
      service_status,
      apply_status,
    });
    ctx.body = {
      code: 200,
      message: "更新成功",
      result: res,
    };
  }

  // 删除管理员
  async deleteAdmin(ctx, next) {
    const { id } = ctx.request.body;
    const res = await deleteAdminById({ id });
    ctx.body = {
      code: 200,
      message: "删除成功",
      result: res,
    };
  }

  // 重置管理员密码
  async changePassword(ctx, next) {
    const { code, password } = ctx.request.body;
    if (await updateAdminInfo({ code, password })) {
      ctx.body = {
        code: 200,
        message: "修改密码成功",
        result: "",
      };
    } else {
      ctx.body = {
        code: 10016,
        message: "密码重置出错",
        result: "",
      };
    }
  }
}

module.exports = new Admin();
