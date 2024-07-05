const express = require("express")
const app = express()

const http =require("http").createServer(app)
const PORT = 8787

http.listen(PORT,() =>{
  console.log(`listen at Port ${PORT}`)
})

app.use(express.static(__dirname + '/public'))
app.get("/",(req,res) =>{
  res.sendFile(__dirname +"/index.html")
  
})

const io = require('socket.io')(http)
io.on("connection",(socket) =>{
  console.log('connected')
  
  socket.on("message",(um) =>{
    socket.broadcast.emit("message",um)
  })
  
})