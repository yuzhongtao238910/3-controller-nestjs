import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module"

import session from "express-session"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.use(session({
        secret: "your0secret-key", // 用于加密会话的密钥
        resave: false, // 在每次请求结束后是否强制保存会话，即使他没有改变
        saveUninitialized: false, // 是否保存未初始化的会话
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 定义会话的cookie配置，设置cookie最大的存活时间是一天
        }
    }))
    
    await app.listen(8080)
}
bootstrap()