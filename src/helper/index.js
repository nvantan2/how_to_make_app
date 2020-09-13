import uniqid from "uniqid";
import axios from "axios";
import * as path from "path";
import InlineCss from "inline-css";
import SgMail from "@sendgrid/mail";
import bluebird from "bluebird";
import ejs from "ejs";
import fs from "fs";
import getConfig from "next/config";

const {
	EMAIL_SENDER,
	API_ENDPOINT,
	API_TOKEN,
	SENDGRID_API_KEY,
} = getConfig().publicRuntimeConfig;
const CONFIG = {
  EMAIL_SUBJECT: "Email Result Example Title",
  YOUR_DOMAIN: "http://example.com",
};

SgMail.setApiKey(SENDGRID_API_KEY);
const ejsPromise = bluebird.promisifyAll(ejs);

export const _parseHtmlTemplate = async (data) => {
  const emailTemplatePath = path.join(
    process.cwd(),
    "src/helper/email_template/template.ejs"
  );
  const cssTemplate = path.join(
    process.cwd(),
    "src/helper/email_template/email.css"
  );

  const html = await ejsPromise.renderFile(emailTemplatePath, data);

  return InlineCss(html, {
    extraCss: fs.readFileSync(cssTemplate),
    url: CONFIG.YOUR_DOMAIN, // your site domain if needed
  });
};

export const sendEmail = async ({ to, data }) => {
  return await SgMail.send({
    to,
    replyTo: EMAIL_SENDER,
    from: EMAIL_SENDER,
    subject: CONFIG.EMAIL_SUBJECT,
    html: await _parseHtmlTemplate(data),
  });
};

export const submitResult = (data) => {
  console.log(API_TOKEN)
  const sessionId = uniqid();
  return axios.post(
    `${API_ENDPOINT}/results`,
    {
      session: sessionId,
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
};
