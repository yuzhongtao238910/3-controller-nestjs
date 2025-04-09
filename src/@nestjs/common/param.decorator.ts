import "reflect-metadata"


export const createParamDecorator = (key: string) => {
    return function (data?: any) {
        // 执行的时候是从右到左
        return function (target: Object, propertyKey: string, parameterIndex: number) {
            // 给类的原型的propertyKey 也就是 handleRequest 这个方法上添加元数据
            // 数组里面应该是放置哪个位置应该是使用的哪个装饰器

            const existingParameters = Reflect.getMetadata("params", target, propertyKey) || []
            // existingParameters.push({
            //     parameterIndex,
            //     key
            // })

            // 这样写是去解决 handleRequest(@Request() request: ExpressRequest, age: number, @Req() req: ExpressRequest)
            existingParameters[parameterIndex] = {
                parameterIndex,
                key,
                data
            }


            // existingParameters[parameterIndex] = key
            Reflect.defineMetadata(`params`, existingParameters, target, propertyKey)
        }
    }
}


export const Request = createParamDecorator("Request")
export const Req = createParamDecorator("Req")


// handleQuery(@Query() query: any, @Query("id") id: any) 
// query是可以是整个的对象，也可以传递参数
export const Query = createParamDecorator("Query")

export const Headers = createParamDecorator("Headers")

export const Session = createParamDecorator("Session") 

export const Ip = createParamDecorator("Ip") 

// Param
export const Param = createParamDecorator("Param") 