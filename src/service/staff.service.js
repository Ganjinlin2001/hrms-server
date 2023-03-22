const Staff = require("../model/staff.model");

class StaffService {
  // 创建新员工
  async createStaff({
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
  }) {
    const res = await Staff.create({
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
    return res.dataValues;
  }

  // 获取员工信息
  async getStaffInfo({ id, code }) {
    const whereOpt = {};
    id && Object.assign(whereOpt, { id });
    code && Object.assign(whereOpt, { code });
    const res = await Staff.findOne({
      attributes: [
        "id",
        "code",
        "password",
        "name",
        "gender",
        "birthday",
        "id_number",
        "avatar",
        "dormitory",
        "phone",
        "email",
        "emergency_contact_person",
        "emergency_contact_phone",
        "home_address",
        "school",
        "school_address",
        "edu_bg",
        "major",
        "job",
        "department",
        "pro_skills",
        "work_experience",
        "campus_experience",
        "project_experience",
        "basic_salary",
        "labor_contract",
        "apply_status",
        "service_status",
      ],
      where: whereOpt,
    });
    console.log("res: ", res);
    return res ? res.dataValues : null;
  }

  // 获取所有员工信息
  async getStaffList() {
    const res = await Staff.findAll({
      attributes: [
        "id",
        "code",
        "password",
        "name",
        "gender",
        "birthday",
        "id_number",
        "avatar",
        "dormitory",
        "phone",
        "email",
        "emergency_contact_person",
        "emergency_contact_phone",
        "home_address",
        "school",
        "school_address",
        "edu_bg",
        "major",
        "job",
        "department",
        "pro_skills",
        "work_experience",
        "campus_experience",
        "project_experience",
        "basic_salary",
        "labor_contract",
        "apply_status",
        "service_status",
      ],
    });
    return res ? res : null;
  }

  // 更新员工信息
  async updateStaffInfo({
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
    password,
    code,
  }) {
    const where = {};
    id && Object.assign(where, {id});
    code && Object.assign(where, {code});
    const updateData = {};
    password && Object.assign(updateData, {password});
    email && Object.assign(updateData, {email});
    name && Object.assign(updateData, {name});
    phone && Object.assign(updateData, {phone});
    avatar && Object.assign(updateData, {avatar});
    department && Object.assign(updateData, {department});
    service_status && Object.assign(updateData, {service_status});
    apply_status && Object.assign(updateData, {apply_status});
    birthday && Object.assign(updateData, {birthday});
    dormitory && Object.assign(updateData, {dormitory});
    emergency_contact_person && Object.assign(updateData, {emergency_contact_person});
    emergency_contact_phone && Object.assign(updateData, {emergency_contact_phone});
    home_address && Object.assign(updateData, {home_address});
    school && Object.assign(updateData, {school});
    school_address && Object.assign(updateData, {school_address});
    edu_bg && Object.assign(updateData, {edu_bg});
    major && Object.assign(updateData, {major});
    job && Object.assign(updateData, {job});
    pro_skills && Object.assign(updateData, {pro_skills});
    work_experience && Object.assign(updateData, {work_experience});
    campus_experience && Object.assign(updateData, {campus_experience});
    project_experience && Object.assign(updateData, {project_experience});
    labor_contract && Object.assign(updateData, {labor_contract});
    basic_salary && Object.assign(updateData, {basic_salary});
    const res = await Staff.update(updateData, {where});
    return res;
  }
}

module.exports = new StaffService();
