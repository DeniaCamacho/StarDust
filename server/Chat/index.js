module.exports = function(io) {
  let users = []

  io.on("connection", socket => {
    socket.on("login", username => {
      users.push({
        username,
        id: socket.id
      })
      io.emit("users", users)
    })

    socket.on("message", message => {
      console.log("Chat message received", message)
      io.emit("message", message)
    })
    socket.on("disconnect", () => {
      users = users.filter(user => user.id !== socket.id)
      io.emit("users", users)
      console.log("disconnected")
    })
  })
}
