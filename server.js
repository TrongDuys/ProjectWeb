require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const { ExpressPeerServer } = require('peer')
const SocketServer = require("./socketServer")
const path = require('path')


const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())


// Socket
const http = require("http").createServer(app);
const io = require("socket.io")(http);

io.on("connection", (socket) => {
  SocketServer(socket);
});

//Create peer server
ExpressPeerServer(http, { path: "/" });


// Routes
app.use('/api', require('./routes/authRouter'))
app.use('/api', require('./routes/diseaseRouter'))
app.use('/api', require('./routes/userRouter'))
app.use("/api", require("./routes/messageRouter"));



const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log('Connected to mongodb')
})


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client", "build", "index.html"));
    });
  }


const port = process.env.PORT || 5000
http.listen(port, () => {
    console.log('Server is running on port', port)
})