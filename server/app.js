const createError = require("http-errors")
const express = require("express")
const userRouter = require("./routes/users")
const protectedRouter = require("./routes/protected")
const jwt = require("express-jwt")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const config = require("config")
require("./Chat")(io)

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/", userRouter)
app.use("/", jwt({ secret: config.get("secret") }), protectedRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  console.log(err)
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.json({
    status: err.status,
    error: err
  })
})

server.listen(8080, () => {
  console.log("Listening on port 8080")
})
