import { Controller, Get } from "@nestjs/common";


@Controller("cats")
export class AppController {
    @Get("hello")
    hello() {
        return "1"
    }

    @Get("apple")
    apple() {
        return "1"
    }
}