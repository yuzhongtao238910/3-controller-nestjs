import { Controller, Get, Request, Req } from "@nestjs/common";
import { Request as ExpressRequest, Response as ExpressResponse, 
    NextFunction  } from "express"




// Req 和 Request是一模一样的
@Controller("users")
export class UserController {
    @Get("req")
    handleRequest(@Request() request: ExpressRequest, @Req() req: ExpressRequest) {
        return "req-users"
    }
}