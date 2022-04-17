const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
const compression = require("compression");
const rateLimit = require("express-rate-limit");

const apiRouter = require("./routes/api.route");
const authRouter = require("./routes/auth.route");
const userRouter = require("./routes/user.route");
const postRouter = require("./routes/post.route");
const projectRouter = require("./routes/project.route");
const categoryRouter = require("./routes/category.route");
const commentRouter = require("./routes/comment.route");
const optionRouter = require("./routes/option.route");
const urlRouter = require("./routes/url.route");
const contactRecordRouter = require("./routes/contactRecord.route");
const adminRouter = require("./routes/admin.route");

const discordWebhookService = require("./services/discordWebhook.service");

require("dotenv").config({
    path: `../env/.env.${process.env.NODE_ENV || "production"}`,
});

const app = express();

app.use(
    cors({
        origin: process.env.ORIGIN,
    })
);

app.use(
    compression({
        level: 6,
    })
);

app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/cdn/", express.static("../public"));

mongoose.connect(
    process.env.MONGODB_CONNECTION_URI,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    },
    async () => {
        console.log(`R: Server version: ${process.env.SERVER_VERSION}`);
        console.log(`R: Server URL: ${process.env.SERVER_URL}`);
        console.log("R: Successfully connected to MongoDB!");
        console.log("R: Server successfully started!");
        discordWebhookService.postMessage({
            content: "",
            embeds: [
                {
                    title: `:green_circle: | Server started!`,
                    color: 1127128,
                    description: null,
                    timestamp: new Date().toISOString(),
                    image: {},
                    thumbnail: {},
                    footer: {
                        text: `${process.platform}`,
                    },
                    fields: [],
                },
            ],
        });
    }
);

app.use("/", apiRouter);
app.use("/api/", apiRouter);
app.use("/api/auth/", authRouter);
app.use("/api/user/", userRouter);
app.use("/api/post/", postRouter);
app.use("/api/project/", projectRouter);
app.use("/api/category/", categoryRouter);
app.use("/api/comment", commentRouter);
app.use("/api/option/", optionRouter);
app.use("/api/url/", urlRouter);
app.use(
    "/api/contact-record/",
    rateLimit({
        windowMs: 60 * 60 * 1000,
        max: 5,
        message: {
            success: false,
            error: {
                message:
                    "Too many requests sent from this IP, please try again after an hour!",
            },
        },
    }),
    contactRecordRouter
);
app.use(
    "/api/admin/",
    rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 500,
        message: {
            success: false,
            error: {
                message:
                    "Too many requests sent from this IP, please try again after an 15 minutes!",
            },
        },
    }),
    adminRouter
);

app.listen(process.env.PORT || 5000, () => {
    console.log(`R: Server starting in ${process.env.NODE_ENV} mode...`);
});
