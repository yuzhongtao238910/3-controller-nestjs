import "reflect-metadata"

import { Logger } from "./logger";
import express, { Express } from "express"
export class NestApplication {
    // 在内部私有化一个express实例
    private readonly app: Express = express()

    // 启动Nestjs
    constructor(protected readonly module) {
        // 启动Nestjs
        // Logger.log("Starting Nest application...", "NestApplication")
    }

    async init() {
        // 取出模块之中的所有的控制器，然后做好路由配置
        // 初始化Nestjs
        const controllers = Reflect.getOwnMetadata("controllers", this.module) || []
        Logger.log(`AppModule dependencies initialized`, "InstanceLoader")
        // 遍历controllers
        for (const Controller of controllers) {

            // 创建控制器实例
            const controllerInstance = new Controller()
            // 获取控制器类的路径前缀
            const prefix = Reflect.getOwnMetadata("prefix", Controller) || ''
            // 开始路由解析
            Logger.log(`${Controller.name} ${prefix}`, "RoutesResolver")
            
        }
    }


    // 启动app服务器
    async listen(port: number) {
        await this.init()
        // 调用express实例的listen方法启动一个express的app服务器，监听port端口
        this.app.listen(port, () => {
            // 启动成功后，打印日志
            Logger.log(`Application is running on: http://localhost:${port}`, "NestApplication")
        })
    }
}
