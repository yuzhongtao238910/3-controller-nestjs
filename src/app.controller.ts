import { Controller, Get } from "@nestjs/common";


@Controller("/")
export class AppController {
    @Get("/")
    hello() {
        return "1"
    }

    @Get("/apple")
    apple() {
        return "1"
    }
}