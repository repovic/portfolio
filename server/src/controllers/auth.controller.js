const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const discordWebhookService = require("../services/discordWebhook.service");
const mailerService = require("../services/mailer.service");
const userService = require("../services/user.service");

const getUserIP = require("../util/getUserIP.util");
const detectBrowser = require("../util/detectBrowser.util");

const serverErrorResponse = {
    success: false,
    error: {
        message: "Server error occurred, please try again!",
    },
};

module.exports = {
    register: async (req, res) => {
        try {
            const { username, firstName, lastName, email, password } = req.body;

            if (!username || !firstName || !lastName || !email || !password) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            if (username.length < 5) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Username must be longer than 5 characters!",
                    },
                });
            }

            if (password.length < 8) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Password must be longer than 8 characters!",
                    },
                });
            }

            if (firstName === lastName) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "First and last name cannont be the same :D",
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

            await userService
                .create({
                    username,
                    firstName,
                    lastName,
                    email,
                    password,
                    registrationIp: getUserIP(req),
                })
                .then((createdUser) => {
                    discordWebhookService.postMessage({
                        content: "",
                        embeds: [
                            {
                                title: `:new: | User created by: ${createdUser.displayName}`,
                                color: 1127128,
                                description: "",
                                timestamp: createdUser.createdAt,
                                author: {
                                    name: `@${createdUser.username}`,
                                    icon_url: createdUser.avatarUrl,
                                },
                                image: {},
                                thumbnail: {},
                                footer: {
                                    text: `ID: ${createdUser._id}`,
                                },
                                fields: [
                                    {
                                        name: "Display Name: ",
                                        value: createdUser.displayName,
                                        inline: false,
                                    },
                                    {
                                        name: "Username: ",
                                        value: "@" + createdUser.username,
                                        inline: false,
                                    },
                                    {
                                        name: "Email: ",
                                        value: createdUser.email,
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
                        from: `${process.env.SITE_AUTHOR} <${process.env.EMAIL_AUTH_USER}>`,
                        to: createdUser.email,
                        replyTo: process.env.EMAIL_FOR_CONTACT,
                        subject: `Thanks for Signing Up!`,
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
                                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello ${createdUser.displayName},</p>
                                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thank you for Signing Up to my Portfolio, now you have access to my applications and you will receive non-spam emails of my new projects!</p>
                                              <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Thanks again!</p>
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

                    return res.json({
                        success: true,
                        payload:
                            userService.hideSensitiveInformations(createdUser),
                    });
                })
                .catch((error) => {
                    if (error.code === 11000) {
                        return res.status(400).json({
                            success: false,
                            error: {
                                message: "Username or email already exist!",
                            },
                        });
                    }
                });
        } catch (error) {
            console.log("authController.register Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            if (!username || !password) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "All fields are required!",
                    },
                });
            }

            const user = await userService.getByUsername(username);

            if (!user) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Account with that username was not found!",
                    },
                });
            }

            if (user.banned) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "The user is banned from server!",
                    },
                });
            }

            if (!(await bcrypt.compare(password, user.passwordHash))) {
                return res.status(400).json({
                    success: false,
                    error: {
                        message: "Username or password are incorrect!",
                    },
                });
            }

            discordWebhookService.postMessage({
                content: "",
                embeds: [
                    {
                        title: `:inbox_tray: | ${user.displayName} logged in!`,
                        color: 1127128,
                        author: {
                            name: `@${user.username}`,
                            icon_url: user.avatarUrl,
                        },
                        description: "",
                        timestamp: new Date().toISOString(),
                        image: {},
                        thumbnail: {},
                        footer: {
                            text: `ID: ${user._id}`,
                        },
                        fields: [
                            {
                                name: "IP: ",
                                value: getUserIP(req),
                                inline: false,
                            },
                        ],
                    },
                ],
            });

            const token = jwt.sign(
                { id: user._id, passwordHash: user.passwordHash },
                process.env.JWT_SECRET
            );

            mailerService.sendMail({
                from: `${process.env.SITE_AUTHOR} <${process.env.EMAIL_AUTH_USER}>`,
                to: user.email,
                replyTo: process.env.EMAIL_FOR_CONTACT,
                subject: `Did you just Sign In from ${
                    detectBrowser(req) || "a new device"
                }?`,
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
                  <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">New Sign In to your account!</span>
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
                                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">Hello ${
                                          user.displayName
                                      },</p>
                                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">We noticed a new Sign In to your account:<br>IP Address: ${getUserIP(
                                          req
                                      )}<br>Browser: ${
                    detectBrowser(req) || "N/A"
                }</p>
                                      <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; Margin-bottom: 15px;">If this was you, you can safely ignore this email. Otherwise change your password or contact support!</p>
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
                                  Sent from <a href="${
                                      process.env.CLIENT_URL
                                  }" target="_blank"style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">${
                    process.env.SITE_DOMAIN
                }</a>
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

            return res.json({
                success: true,
                payload: {
                    token: token,
                    user: userService.hideSensitiveInformations(user),
                },
            });
        } catch (error) {
            console.log("authController.login Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },

    checkToken: async (req, res) => {
        try {
            const user = req.userData;
            if (user) {
                return res.json({
                    success: true,
                    payload: userService.hideSensitiveInformations(user),
                });
            }
            return res.status(400).json({
                success: false,
                error: {
                    message: "User Data was not found!",
                },
            });
        } catch (error) {
            console.log("authController.checkToken Error: " + error);
            return res.status(500).json(serverErrorResponse);
        }
    },
};
