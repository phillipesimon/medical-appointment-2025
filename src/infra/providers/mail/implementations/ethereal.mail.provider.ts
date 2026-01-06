import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider, MailDTO } from "../mail.proviider";

export class EtherealMailProvider implements IMailProvider {
  private client!: Transporter;
  constructor() {
    nodemailer
      .createTestAccount()
      .then(() => {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          auth: {
            user: "elva.hamill84@ethereal.email",
            pass: "tg3KEDWce1X8nq3BzM",
          },
        });
        this.client = transporter;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async sendMail(data: MailDTO): Promise<void> {
    const resultMail = await this.client.sendMail({
      to: data.to,
      from: data.from,
      subject: data.subject,
      text: data.text,
      html: data.html,
    });

    console.log("Message sent: %s", resultMail.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(resultMail));
  }
}
