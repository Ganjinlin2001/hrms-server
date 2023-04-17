const {
  getJobList,
  createJob,
  updateJobInfo,
  searchJobByKeyWord,
  deleteJob
} = require("../service/recruitment.service");

class recruitmentController {
  async getJobList(ctx) {
    const { count, rows } = await getJobList();
    ctx.body = {
      code: 200,
      message: "数据获取成功",
      result: { count, rows },
    };
  }

  // 新增岗位
  async addJob(ctx) {
    const { name, salary, city, experiece, degree, desc } = ctx.request.body;
    const res = await createJob({
      name,
      salary,
      city,
      experiece,
      degree,
      desc,
    });
    ctx.body = {
      code: 200,
      message: "新增成功",
      result: res,
    };
  }

  // 编辑更新岗位信息
  async updateJobInfo(ctx) {
    const { name, salary, city, experiece, degree, desc } = ctx.request.body;
    const res = await updateJobInfo({
      name,
      salary,
      city,
      experiece,
      degree,
      desc,
    });
    ctx.body = {
      code: 200,
      message: "岗位信息更改成功",
      result: res,
    };
  }

  // 搜索岗位信息
  async searchJobByKeyWord(ctx) {
    const { keyWord } = ctx.query;
    const res = await searchJobByKeyWord({keyWord});
    ctx.body = {
      code: 200,
      message: '获取成功',
      result: res,
    }
  }

  // 删除岗位
  async deleteJob(ctx) {
    const data = ctx.request.body;
    const res = await deleteJob(data);
    ctx.body = {
      code: 200,
      message: '删除成功',
      result: res,
    }
  }
}

module.exports = new recruitmentController();
