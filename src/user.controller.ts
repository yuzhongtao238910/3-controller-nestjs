import { Controller, Get, Request, Req, Query, Headers, Session, Ip, Param } from "@nestjs/common";
import { Request as ExpressRequest, Response as ExpressResponse, 
    NextFunction  } from "express"




// Req 和 Request是一模一样的
@Controller("users")
export class UserController {
    // 
    @Get("req")
    handleRequest(@Request() request: ExpressRequest, age: number, @Req() req: ExpressRequest) {
        // 如果有一个参数没有配置装饰器的话，像之前这样写的就会出错了
        // 但是这种情况下一般不会出现，这种情况下age都是空的
        // 
        console.log(req.method)
        console.log(request.method)
        console.log(req.url)
        console.log(request.url)
        return "req-users"
    }
    // 获取查询参数 query
    @Get("query")
    handleQuery(@Query() query: any, @Query("id") id: any) {
        console.log(query, id, "+++")
        return "query"
    }
    

    // 获取请求头的参数
    @Get("headers")
    handleHeaders(@Headers() headers: any, @Headers("accept") accept: any) {
        console.log(headers, accept, "+++")
        return "headers"
    }


    // 处理会话
    @Get("session")
    handleSession(@Session() session: any, @Session("pageView") pageView: any) {
        console.log(session, pageView, "+++")
        if (session.pageView) {
            session.pageView++
        } else {
            session.pageView=1
        }
        if (!session.userinfo) {
            session.userinfo = {
                name: "1111"
            }
        } else {
            console.log(session)
        }
        
        return "session"
    }


    @Get("ip")
    handleUserIp(@Ip() ip: string) {
        console.log(ip)
        return "ip--config" + ip
    }


    @Get(":username/info/:age")
    handleParamsRequest(@Param() params: any, @Param("username") username: string, @Param("age") age: string) {
        console.log(params)
        console.log(username)
        console.log(age)
        return username + age + "info"
    }


    // 支持通配符
    // @Get()

}