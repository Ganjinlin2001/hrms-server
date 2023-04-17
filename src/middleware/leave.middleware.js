// 引入发送邮件相关的模块
const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");
const { HOST_EMAIL, SMTP, HOST } = require("../config/config.default");
const fs = require("fs");

const { getStaffInfo } = require("../service/staff.service");

const fileName = "员工离职协议书.pdf";

const sendPDF = async (ctx, next) => {
  try {
    const { code, status, pdf_base64_string } = ctx.request.body;
    // 获取员工的邮箱
    const { email, name } = await getStaffInfo({ code });
    // 将Base64字符串转换为二进制数据
    const pdfData = Buffer.from(pdf_base64_string, "base64");

    // 先写，然后发送，最后删除
    await writeFileAsync(fileName, pdfData);
    console.log("PDF file saved");
    // 创建连接对象
    const transport = await nodemailer.createTransport(
      smtpTransport({
        host: HOST, // 使用 qq 的 smtp 服务
        port: 465, // smtp端口
        secure: true,
        auth: {
          user: HOST_EMAIL, //用户名
          pass: SMTP, // SMTP授权码
        },
      })
    );

    // 发邮件的配置
    const mailOptions = {
      from: HOST_EMAIL, // 发件邮箱
      to: email, // 收件列表
      subject: "离职协议书", // 标题
      html: `
        <p>尊敬的${name}先生/女士，</p>
        <p>很遗憾地接到了您的离职申请。我想在此表达我们对您的感激之情，并感谢您在公司的时间和努力。</p>
        <p>我们非常感谢您在公司的工作表现，您的专业知识和技能对公司做出了重要的贡献。我们认为您是一名出色的员工，您在公司的离开将会是我们的损失。</p>
        <p>您的离职流程已办理完成，此邮件下方附有您与我们公司签署的离职协议书，如果您需要任何帮助或有任何疑问，请不要犹豫与我们联系</p>
        <p>最后，我们再次感谢您在公司的付出和贡献，祝您在未来的工作和生活中一切顺利。</p>
        <p>此致</p>
        <p>敬礼</p>
        <p>XXX公司</p>`, // html 内容
      attachments: [
        {
          fileName,
          path: fileName,
          // content: data,  这个配置没用
          // encoding: "base64",
        },
      ],
    };

    try {
      let info = await transport.sendMail(mailOptions);
      console.log("邮件发送成功", info);
      // 删除文件
      // fs.unlink(fileName);
      await next();
    } catch (error) {
      ctx.body = {
        code: 10014,
        message: "邮件发送失败",
        result: null,
      };
    }
    // fs.writeFile(fileName, pdfData, async (error) => {
    //   if (error) {
    //     console.log("创建文件出错：", error);
    //     ctx.body = {
    //       code: 10014,
    //       message: "创建文件出错",
    //       result: null,
    //     };
    //   } else {
    //     console.log("PDF file saved");
    //     // 读取PDF文件内容
    //     // 创建连接对象
    //     const transport = await nodemailer.createTransport(
    //       smtpTransport({
    //         host: HOST, // 使用 qq 的 smtp 服务
    //         port: 465, // smtp端口
    //         secure: true,
    //         auth: {
    //           user: HOST_EMAIL, //用户名
    //           pass: SMTP, // SMTP授权码
    //         },
    //       })
    //     );

    //     // 发邮件的配置
    //     const mailOptions = {
    //       from: HOST_EMAIL, // 发件邮箱
    //       to: email, // 收件列表
    //       subject: "离职协议书", // 标题
    //       html: `
    //         <p>尊敬的${name}先生/女士，</p>
    //         <p>很遗憾地接到了您的离职申请。我想在此表达我们对您的感激之情，并感谢您在公司的时间和努力。</p>
    //         <p>我们非常感谢您在公司的工作表现，您的专业知识和技能对公司做出了重要的贡献。我们认为您是一名出色的员工，您在公司的离开将会是我们的损失。</p>
    //         <p>您的离职流程已办理完成，此邮件下方附有您与我们公司签署的离职协议书，如果您需要任何帮助或有任何疑问，请不要犹豫与我们联系</p>
    //         <p>最后，我们再次感谢您在公司的付出和贡献，祝您在未来的工作和生活中一切顺利。</p>
    //         <p>此致</p>
    //         <p>敬礼</p>
    //         <p>XXX公司</p>`, // html 内容
    //       attachments: [
    //         {
    //           fileName,
    //           path: fileName,
    //           // content: data,  这个配置没用
    //           // encoding: "base64",
    //         },
    //       ],
    //     };

    //     try {
    //       let info = await transport.sendMail(mailOptions);
    //       console.log('邮件发送成功', info);
    //       await next();
    //       // 删除文件
    //       // fs.unlink(fileName);
    //     } catch (error) {
    //       ctx.body = {
    //         code: 10014,
    //         message: "邮件发送失败",
    //         result: null,
    //       };
    //     }
    //     setTimeout(() => {}, 2000);
    //   }
    // });
    // fs.readFile(fileName, async (error, data) => {
    //   console.log("data:", data);
    //   if (error) {
    //     console.log("读取文件出错：", error);
    //     ctx.body = {
    //       code: 10014,
    //       message: "读取文件出错",
    //       result: null,
    //     };
    //   } else {
    //     // 创建连接对象
    //     const transport = nodemailer.createTransport(
    //       smtpTransport({
    //         host: HOST, // 使用 qq 的 smtp 服务
    //         port: 465, // smtp端口
    //         secure: true,
    //         auth: {
    //           user: HOST_EMAIL, //用户名
    //           pass: SMTP, // SMTP授权码
    //         },
    //       })
    //     );
    //     try {
    //       await transport.sendMail({
    //         from: HOST_EMAIL, // 发件邮箱
    //         to: email, // 收件列表
    //         subject: "离职协议书", // 标题
    //         html: `
    //           <p>尊敬的${name}先生/女士，</p>
    //           <p>很遗憾地接到了您的离职申请。我想在此表达我们对您的感激之情，并感谢您在公司的时间和努力。</p>
    //           <p>我们非常感谢您在公司的工作表现，您的专业知识和技能对公司做出了重要的贡献。我们认为您是一名出色的员工，您在公司的离开将会是我们的损失。</p>
    //           <p>您的离职流程已办理完成，此邮件下方附有您与我们公司签署的离职协议书，如果您需要任何帮助或有任何疑问，请不要犹豫与我们联系</p>
    //           <p>最后，我们再次感谢您在公司的付出和贡献，祝您在未来的工作和生活中一切顺利。</p>
    //           <p>此致</p>
    //           <p>敬礼</p>
    //           <p>XXX公司</p>`, // html 内容
    //         attachments: [
    //           {
    //             fileName: "员工离职协议书.pdf",
    //             // path: '员工离职协议书.pdf'
    //             content: data,
    //             encoding: "base64",
    //           },
    //         ],
    //       });
    //       console.log("邮件发送成功");
    //       // 删除文件
    //       // fs.unlink(fileName);
    //       next();
    //     } catch (error) {
    //       ctx.body = {
    //         code: 10014,
    //         message: "邮件发送失败",
    //         result: null,
    //       };
    //     }
    //   }
    // });

    // function createFile(fileName) {}
  } catch (error) {
    console.log("发送邮件出错了", error);
    ctx.body = {
      code: 10014,
      message: "发送邮件出错",
      result: null,
    };
  }
};

async function writeFileAsync(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, data, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });
}

module.exports = {
  sendPDF,
};
