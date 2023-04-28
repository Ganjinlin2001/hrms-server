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
      createdAt,
      updatedAt,
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
          createdAt,
          updatedAt,
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
      basic_salary,
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
      basic_salary,
    });
    ctx.body = {
      code: 200,
      message: "注册成功",
      result: null,
    };
  }

  // 获取所有员工信息
  async getStaffList(ctx, next) {
    const keyWord = '';
    const res = await getStaffList({ keyWord });
    ctx.body = {
      code: 200,
      message: "请求成功",
      result: res,
    };
  }

  async getStaffInfo(ctx, next) {
    const { code } = ctx.query;
    console.log("code: ", code);
    // const {}
    const {
      id,
      name,
      gender,
      birthday,
      id_number,
      password,
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
      message: "数据获取成功",
      result: {
        userInfo: {
          id,
          code,
          name,
          gender,
          birthday,
          id_number,
          password,
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

  // 更新员工信息
  async adminUpdate(ctx, next) {
    const {
      id,
      name,
      code,
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
    } = ctx.request.body;
    console.log("小程序传过来的数据：", ctx.request.body);
    const res = await updateStaffInfo({
      id,
      name,
      code,
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
    });
    ctx.body = {
      code: 200,
      message: "更新成功",
      result: res,
    };
  }

  // 员工修改密码
  async changePassword(ctx) {
    const { code, password } = ctx.request.body;
    if (await updateStaffInfo({ code, password })) {
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

  async searchStaffInfoByKeyWord(ctx) {
    try {
      const { keyWord } = ctx.query;
      console.log("keyWord: ", typeof keyWord, keyWord);
      const res = await getStaffList({ keyWord });
      ctx.body = {
        code: 200,
        message: "数据获取成功",
        result: res,
      };
    } catch (error) {
      console.error('controller 出错信息：', error)
    }
  }
}

module.exports = new StaffController();
