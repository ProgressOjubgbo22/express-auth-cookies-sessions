const express = require('express')
const cookies = require('cookie-parser')
const session = require('express-session')
const login = require('./routes/login')
const rememberMe = require('./routes/rememberme')
const language = require('./routes/language')
const theme = require('./routes/theme')
const authentication = require('./route/authentication')
// const session = require('express-session')
const app = express();
const PORT = 3000;


app.use(express.json())

app.use(cookies())

app.use(session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        maxAge: 60000
    }
}))


app.use(authentication)
// app.use(theme);
// app.use("/", language);
// app.use("/", rememberMe);
// app.use("/", login);

// app.get("/", (req, res) => {
//     res.send("hellol")
// })
// console.log("hello");

app.listen(PORT, () => {
    console.log("running http://localhost:3000");
})
