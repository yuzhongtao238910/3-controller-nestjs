

/**
 * express之中的next是一个用于中间件链条处理的函数
 * 
 * 每一个中间件接收3个参数：req res next
 * 
 * 中间件函数通过调用next可以将控制权传递给下一个中间件函数，如果中间件没有调用next，那么请求就会挂起了
 */



class Request {
    url

    constructor(url) {
        this.url = url
    }
}

class Response {
    send(message) {
        console.log(message)
    }
}

class Express {
    middlewares = []

    use(middleware) {
        this.middlewares.push(middleware)
    }

    handleRequest(req, res) {
        const { middlewares } = this
        let index = 0

        function next() {
            if (index < middlewares.length) {
                const middleware = middlewares[index++]
                middleware(req, res, next)
            }
        }

        next()
    }
}

const app = new Express()

app.use((req, res, next) => {
    console.log("middleware1")
    next()
})

app.use((req, res, next) => {
    console.log("middleware2")
    next()
})

app.use((req, res, next) => {
    console.log("middleware3")
    res.send("hello")
})

const req = new Request("/users")



const res = new Response()


app.handleRequest(req, res)