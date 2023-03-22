const {
  createStaff,
  getStaffInfo,
  getStaffList,
  updateStaffInfo,
} = require("../service/staff.service");

class StaffController {
  // 员工登录
  async login(ctx, next) {
    const { code } = ctx.request.body;
    // const {}
    const {
      id,
      name,
      gender,
      birthday,
      id_number,
      avatar,
      dormitory,
      phone,
      email,
      emergency_contact_person,
      emergency_contact_phone,
      home_address,
      school,
      school_address,
      edu_bg,
      major,
      job,
      department,
      pro_skills,
      work_experience,
      campus_experience,
      project_experience,
      basic_salary,
      labor_contract,
      apply_status,
      service_status,
    } = await getStaffInfo({ code });
    ctx.body = {
      code: 200,
      message: "登录成功",
      result: {
        userInfo: {
          id,
          code,
          name,
          gender,
          birthday,
          id_number,
          avatar,
          dormitory,
          phone,
          email,
          emergency_contact_person,
          emergency_contact_phone,
          home_address,
          school,
          school_address,
          edu_bg,
          major,
          job,
          department,
          pro_skills,
          work_experience,
          campus_experience,
          project_experience,
          basic_salary,
          labor_contract,
          apply_status,
          service_status,
        },
      },
    };
  }
  // 创建用户
  async register(ctx, next) {
    const {
      code,
      password,
      name,
      gender,
      id_number,
      phone,
      email,
      labor_contract,
      avatar,
      job,
      department,
      dormitory,
    } = ctx.request.body;
    const res = await createStaff({
      code,
      password,
      name,
      gender,
      id_number,
      phone,
      email,
      labor_contract,
      avatar,
      job,
      department,
      dormitory,
    });
    ctx.body = {
      code: 200,
      message: "注册成功",
      result: null,
    };
  }

  // 获取所有员工信息
  async getStaffList(ctx, next) {
    const res = await getStaffList();
    ctx.body = {
      code: 200,
      message: "请求成功",
      result: res,
    };
  }

  // 更新员工信息
  async adminUpdate(ctx, next) {
    const { id, code, apply_status } = ctx.request.body;
    const res = await updateStaffInfo({ id, code, apply_status });
    ctx.body = {
      code: 200,
      message: "更新成功",
      result: res,
    };
  }
}

module.exports = new StaffController();
