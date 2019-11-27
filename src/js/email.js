var nodemailer = require("nodemailer");

async function main() {
    // Generate SMTP service account from ethereal.email
    // let account = await nodemailer.createTestAccount();

    console.log('Credentials obtained, sending message...');

    // NB! Store the account object values somewhere if you want
    // to re-use the same account for future mail deliveries

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport(
        {
            service: 'qq', // 使用内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            secureConnection: true, // 使用 SSL
            port: 465, // SMTP 端口
            auth: {
                user: "654818685@qq.com", // 账号
                pass: "couultakyczjbdjj" // 密码
            },
            logger: false,
            debug: false // include SMTP traffic in the logs
        },
    );

    // Message object
    let message = {
        from: "Fred Foo <654818685@qq.com>", // 发件地址
        to: "17703772792@163.com", // 收件列表
        subject: "Hello world", // 标题
        html: "<b>thanks a for visiting!</b> 世界，你好！" // html 内容
    }


    let info = await transporter.sendMail(message);

    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));

    // only needed when using pooled connections
    transporter.close();
}

main().catch(err => {
    console.error(err.message);
    process.exit(1);
});