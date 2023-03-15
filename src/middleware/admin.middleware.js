const bcrypt = require("bcryptjs");

const { getAdminInfo } = require("../service/admin.service");

const { invalidPassword } = require("../constant/err.type");
// 验证密码是否正确
const verifyPassword = async (ctx, next) => {
  const { code, password } = ctx.request.body;
  console.log(code, password);
  // 获取管理员信息
  const res = await getAdminInfo({ code });
  console.log(res);
  // 2. 判断密码是否正确
  console.log(
    bcrypt.compareSync(
      "1234",
      "$2a$10$YQlg0Gs6hE2Srsc2O1lqsOp9ShsphTjYDMVh3R/vDzJtNiVBxrQGy"
    )
  );
  try {
    if (!bcrypt.compareSync(password, res.password)) {
      // ctx.app.emit("error", invalidPassword, ctx);
      ctx.body = {
        code: 10016,
        message: "密码错误",
        result: "",
      };
      return;
    }
  } catch (error) {
    console.log("密码比对失败：", error);
  }
  console.log("密码正确");
  await next();
};

// 验证管理员账号是否被注册
const checkAdminIsExist = async (ctx, next) => {
  const { code } = ctx.request.body;
  console.log("code: ", code);
  const res = await getAdminInfo({ code });
  if (res === null) {
    ctx.body = {
      code: 1002,
      message: "用户不存在",
      result: true,
    };
  } else {
    await next();
  }
};

// 验证管理员用户是否通过审核
const verifyApplyStatus = async (ctx, next) => {
  const { code } = ctx.request.body;
  const res = await getAdminInfo({ code });
  if (res.apply_status !== 1) {
    ctx.body = {
      code: 1004,
      message: "当前账号未审核认证",
      result: null,
    };
  } else {
    await next();
  }
};

module.exports = {
  verifyPassword,
  checkAdminIsExist,
  verifyApplyStatus,
};
