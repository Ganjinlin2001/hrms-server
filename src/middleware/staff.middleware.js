const bcrypt = require("bcryptjs");

const { getStaffInfo } = require("../service/staff.service");


// 验证员工账号是否存在
const checkStaffIsExist = async (ctx, next) => {
  // console.log('ctx.request.body: ', ctx.request.body);
  const {code} = ctx.request.body;
  const res = await getStaffInfo({code});
  if (res === null) {
    ctx.body = {
      code: 1002,
      message: "用户不存在",
      result: true,
    };
  } else {
    await next();
  }
}

// 验证员工是否已经注册
const verifyStaffCodeIsExist = async (ctx, next) => {
  // console.log('ctx.request.body: ', ctx.request.body);
  const { code } = ctx.request.body;
  const res = await getStaffInfo({ code });
  console.log('res: ', res);
  if (res) {
    if (res.apply_status === 0) {
      ctx.body = {
        code: 10017,
        message: "您已提交当前账号的注册信息，管理员正在审核中，请勿重复申请",
        result: null,
      };
    }
  } else {
    // 不存在则给注册
    await next();
  }
};

// 验证密码是否正确
const verifyPassword = async (ctx, next) => {
  const { code, password } = ctx.request.body;
  console.log(code, password);
  // 获取管理员信息
  const res = await getStaffInfo({ code });
  console.log(res);
  // 2. 判断密码是否正确
  console.log(
    bcrypt.compareSync(
      "12345",
      "$2a$10$qQH17uLuM2HM0.jl4ug37uwgeEn/tNOZxzCnc11P1otJ3jn6NQVtK"
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

// 验证员工是否已经通过管理员审核
const checkApplyhasPass = async (ctx, next) => {
  const {code} = ctx.request.body;
  const res = await getStaffInfo({code});
  if (res.apply_status === 0) {
    ctx.body = {
      code: 10018,
      message: '当前账号的注册申请正在审核中，请耐心等待管理员审核通过',
      result: null,
    }
  } else {
    await next();
  }
}

module.exports = {
  verifyStaffCodeIsExist,
  verifyPassword,
  checkStaffIsExist,
  checkApplyhasPass,

}
