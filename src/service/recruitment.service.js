const Recruitment = require("../model/recruitment.model");
const {Op} = require('sequelize');

class recruitmentService {
  async getJobList() {
    return await Recruitment.findAndCountAll();
  }

  async createJob({ name, salary, city, experiece, degree, desc }) {
    return await Recruitment.create({
      name,
      salary,
      city,
      experiece,
      degree,
      desc,
    });
  }

  async searchJobByKeyWord({ keyWord }) {
    return await Recruitment.findAndCountAll({
      where: {
        name: {
          [Op.like]: `%${keyWord}%`
        }
      }
    })
  }

  async deleteJob(data) {
    // 处理数据
    // if-else 的写法
    // let id = null;
    // if (data instanceof Array) {
    //   id = data.map(item => {
    //     return item.id;
    //   })
    // } else {
    //   id = data.id;
    // }
    const id = data instanceof Array ? data.map(i => i.id) : data.id;
    return await Recruitment.destroy({
      where: {
        id,
      }
    })
  }
}

module.exports = new recruitmentService();
