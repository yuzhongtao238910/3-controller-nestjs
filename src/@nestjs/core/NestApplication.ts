import "reflect-metadata"

import { Logger } from "./logger";
import express, { Express, Request as ExpressRequest, Response as ExpressResponse, 
    NextFunction  } from "express"
import path from "path"
export class NestApplication {
    // 在内部私有化一个express实例
    private readonly app: Express = express()

    use(middleware) {
        this.app.use(middleware)
    }

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
            const controller = new Controller()
            // 获取控制器类的路径前缀
            const prefix = Reflect.getOwnMetadata("prefix", Controller) || ''
            // 开始路由解析
            Logger.log(`${Controller.name} ${prefix}`, "RoutesResolver")

            const controllerPrototype = Reflect.getPrototypeOf(controller)

            for (const methodName of Object.getOwnPropertyNames(controllerPrototype)) {
                // console.log(methodName)
                const method = controllerPrototype[methodName]
                // 获取此函数上绑定的方法名字的元数据
                const httpMethod = Reflect.getMetadata("method", method)
                // 获取此函数上绑定的路径的元数据
                const pathMetaData = Reflect.getMetadata("path", method)

                // 如果方法名字不存在，那么就不处理了
                if (!httpMethod) {
                    continue
                }
                const routePath = path.posix.join("/", prefix, pathMetaData)
                // 配置路由，当客户端以httpMethod请求的时候会有对应的函数来进行处理
                this.app[httpMethod.toLowerCase()](routePath, (req: ExpressRequest, res: ExpressResponse, next: NextFunction) => {
                    const args = this.resolveParams(controller, method, methodName, req, res, next)
                    const result = method.call(controller, ...args)
                    res.send(result)
                })
                Logger.log(`Mapped {${routePath}, ${httpMethod}}`, "RoutesResolver")
            }
            Logger.log(` Nest application successfully started`, "NestApplication")
        }
    }

    resolveParams(target: any, method: any, methodName: any, req: ExpressRequest, res: ExpressResponse, next: NextFunction) {

        const existingParameters = Reflect.getMetadata("params", Reflect.getPrototypeOf(target), methodName)


        let temp = existingParameters
        if (existingParameters && existingParameters.length) {
            // temp = existingParameters.sort((a, b) => a.parameterIndex - b.parameterIndex)
        }
        

        return temp.map((item, index) => {
            const {key, data} = item
            switch (key) {
                case "Req":
                case "Request":
                    return req
                case "Query":
                    return data ? req.query[data] : req.query
                case "Headers":
                    return data ? req.headers[data] : req.headers
                case "Session":
                    return data ? req.session[data] : req.session
                case "Ip":
                    return req.ip
                case "Param":
                    return data ? req.params[data] : req.params
                default:
                    return null
            }
        })
        // .filter(item => item)
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

