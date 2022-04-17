const validator = require("validator");

const contactRecordService = require("../services/contactRecord.service");
const discordWebhookService = require("../services/discordWebhook.service");
const mailerService = require("../services/mailer.service");

const getUserIP = require("../util/getUserIP.util");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    createContactRecord: async (req, res) => {
        try {
            const { firstName, lastName, email, message } = req.body;
            const ip = getUserIP(req);

            if (!firstName || !lastName || !email || !message) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            if (!validator.isEmail(email)) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Please use a valid email address!",
                    },
                });
            }

            await contactRecordService
                .create({ firstName, lastName, email, message, ip })
                .then((createdContactRecord) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | Contact Message created by: ${createdContactRecord.firstName} ${createdContactRecord.lastName}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdContactRecord.createdAt,
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdContactRecord._id}`,
                                },
                                fields: [
                                    {
                                        name: "Display Name: ",
                                        value: `${createdContactRecord.firstName} ${createdContactRecord.lastName}`,
                                        inline: false,
                                    },
                                    {
                                        name: "Email: ",
                                        value: createdContactRecord.email,
                                        inline: false,
                                    },
                                    {
                                        name: "Message: ",
                                        value: createdContactRecord.message,
                                        inline: false,
                                    },
                                    {
                                        name: "IP: ",
                                        value: getUserIP(req),
                                        inline: false,
                                    },
                                ],
                            },
                        ],
                    });

                    mailerService.sendMail({
                        from: `"${firstName} ${lastName}" <${process.env.EMAIL_AUTH_USER}>`,
                        to: process.env.EMAIL_FOR_NOTIFICATIONS,
                        replyTo: email,
                        subject: `New contact message from ${firstName} ${lastName}!`,
                        html: `<!doctype html>
                        <html>
                          <head>
                            <meta name="viewport" content="width=device-width">
                            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                            <title>Simple Transactional Email</title>
                            <style>
                            @media only screen and (max-width: 620px) {
                              table[class=body] h1 {
                                font-size: 28px !important;
                                margin-bottom: 10px !important;
                              }
                              table[class=body] p,
                                    table[class=body] ul,
                                    table[class=body] ol,
                                    table[class=body] td,
                                    table[class=body] span,
                                    table[class=body] a {
                                font-size: 16px !important;
                              }
                              table[class=body] .wrapper,
                                    table[class=body] .article {
                                padding: 10px !important;
                              }
                              table[class=body] .content {
                                padding: 0 !important;
                              }
                              table[class=body] .container {
                                padding: 0 !important;
                                width: 100% !important;
                              }
                              table[class=body] .main {
                                border-left-width: 0 !important;
                                border-radius: 0 !important;
                                border-right-width: 0 !important;
                              }
                              table[class=body] .btn table {
                                width: 100% !important;
                              }
                              table[class=body] .btn a {
                                width: 100% !important;
                              }
                              table[class=body] .img-responsive {
                                height: auto !important;
                                max-width: 100% !important;
                                width: auto !important;
                              }
                            }
                        
                            @media all {
                              .ExternalClass {
                                width: 100%;
                              }
                              .ExternalClass,
                                    .ExternalClass p,
                                    .ExternalClass span,
                                    .ExternalClass font,
                                    .ExternalClass td,
                                    .ExternalClass div {
                                line-height: 100%;
                              }
                              .apple-link a {
                                color: inherit !important;
                                font-family: inherit !important;
                                font-size: inherit !important;
                                font-weight: inherit !important;
                                line-height: inherit !important;
                                text-decoration: none !important;
                              }
                              #MessageViewBody a {
                                color: inherit;
                                text-decoration: none;
                                font-size: inherit;
                                font-family: inherit;
                                font-weight: inherit;
                                line-height: inherit;
                              }
                              .btn-primary table td:hover {
                                background-color: #34495e !important;
                              }
                              .btn-primary a:hover {
                                background-color: #34495e !important;
                                border-color: #34495e !important;
                              }
                            }
                            </style>
                          </head>
                          <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                            <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">You got a new contact message!</span>
                            <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                              <tr>
                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                                <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                                  <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
                                    <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                                      <tr>
                                        <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                          <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                            <tr>
                                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hi there,</p>
                                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">${firstName} ${lastName} sent you a contact message using contact form on portfolio!</p>
                                                <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                                </table>
                                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Contact Email: ${email}</p>
                                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Message: ${message}</p>
                                                <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">IP Address: ${ip}</p>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </table>
                                    <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                                      <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                        <tr>
                                        <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                                          Sent from <a href="${process.env.CLIENT_URL}" target="_blank"style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">${process.env.SITE_DOMAIN}</a>
                                        </td>
                                        </tr>
                                      </table>
                                    </div>
                                    <!-- END FOOTER -->
                        
                                  <!-- END CENTERED WHITE CONTAINER -->
                                  </div>
                                </td>
                                <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                              </tr>
                            </table>
                          </body>
                        </html>`,
                    });

                    mailerService.sendMail({
                        from: `${process.env.SITE_AUTHOR} <${process.env.EMAIL_AUTH_USER}>`,
                        to: email,
                        replyTo: process.env.EMAIL_FOR_CONTACT,
                        subject: `Message was successfully sent!`,
                        html: `<!doctype html>
                      <html>
                        <head>
                          <meta name="viewport" content="width=device-width">
                          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                          <title>Simple Transactional Email</title>
                          <style>
                          @media only screen and (max-width: 620px) {
                            table[class=body] h1 {
                              font-size: 28px !important;
                              margin-bottom: 10px !important;
                            }
                            table[class=body] p,
                                  table[class=body] ul,
                                  table[class=body] ol,
                                  table[class=body] td,
                                  table[class=body] span,
                                  table[class=body] a {
                              font-size: 16px !important;
                            }
                            table[class=body] .wrapper,
                                  table[class=body] .article {
                              padding: 10px !important;
                            }
                            table[class=body] .content {
                              padding: 0 !important;
                            }
                            table[class=body] .container {
                              padding: 0 !important;
                              width: 100% !important;
                            }
                            table[class=body] .main {
                              border-left-width: 0 !important;
                              border-radius: 0 !important;
                              border-right-width: 0 !important;
                            }
                            table[class=body] .btn table {
                              width: 100% !important;
                            }
                            table[class=body] .btn a {
                              width: 100% !important;
                            }
                            table[class=body] .img-responsive {
                              height: auto !important;
                              max-width: 100% !important;
                              width: auto !important;
                            }
                          }
                      
                          @media all {
                            .ExternalClass {
                              width: 100%;
                            }
                            .ExternalClass,
                                  .ExternalClass p,
                                  .ExternalClass span,
                                  .ExternalClass font,
                                  .ExternalClass td,
                                  .ExternalClass div {
                              line-height: 100%;
                            }
                            .apple-link a {
                              color: inherit !important;
                              font-family: inherit !important;
                              font-size: inherit !important;
                              font-weight: inherit !important;
                              line-height: inherit !important;
                              text-decoration: none !important;
                            }
                            #MessageViewBody a {
                              color: inherit;
                              text-decoration: none;
                              font-size: inherit;
                              font-family: inherit;
                              font-weight: inherit;
                              line-height: inherit;
                            }
                            .btn-primary table td:hover {
                              background-color: #34495e !important;
                            }
                            .btn-primary a:hover {
                              background-color: #34495e !important;
                              border-color: #34495e !important;
                            }
                          }
                          </style>
                        </head>
                        <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                          <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">Thanks for being awesome!</span>
                          <table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #f6f6f6;">
                            <tr>
                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                              <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 580px; padding: 10px; width: 580px;">
                                <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 580px; padding: 10px;">
                                  <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 3px;">
                                    <tr>
                                      <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;">
                                        <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                          <tr>
                                            <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">
                                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello ${firstName} ${lastName},</p>
                                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">I have received your message and would like to thank you for writing to me. Will reply by email as soon as possible.</p>
                                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Talk to you soon, ${process.env.SITE_AUTHOR}</p>
                                              <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                              </table>
                                            </td>
                                          </tr>
                                        </table>
                                      </td>
                                    </tr>
                                  </table>
                                  <div class="footer" style="clear: both; Margin-top: 10px; text-align: center; width: 100%;">
                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                      <tr>
                                        <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; font-size: 12px; color: #999999; text-align: center;">
                                          Sent from <a href="${process.env.CLIENT_URL}" target="_blank"style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">${process.env.SITE_DOMAIN}</a>
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                  <!-- END FOOTER -->
                      
                                <!-- END CENTERED WHITE CONTAINER -->
                                </div>
                              </td>
                              <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;">&nbsp;</td>
                            </tr>
                          </table>
                        </body>
                      </html>`,
                    });

                    res.status(200).json({
                        success: true,
                        payload:
                            contactRecordService.format(createdContactRecord),
                    });
                });
        } catch (error) {
            console.log(
                "contactRecordController.createContactRecord Error: " + error
            );
            return res.status(500).json(serverErrorResponse);
        }
    },
};
