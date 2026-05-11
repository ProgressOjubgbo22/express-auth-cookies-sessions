const express = require('express');
const router = express.Router();

const User = [
    {id: 1, username: "Drake", password: 4321},
    {id: 2, username: "Rema", password: 1234}
]

router.post("/login", (req, res) => {
    const {username, password, rememberMe} = req.body;

    const user = User.find(u => u.username === username && u.password === Number(password));
    if(!user) {
        return res.send("user not found")
    }

    res.cookie("userId", user.id,
        {
            httpOnly: true,
            maxAge: rememberMe ? 1000 * 60 * 60 *24 * 30 : 1000 * 60 * 60
        });
        res.json({ message: "User logged in", rememberMe });
})

router.get("/dashboard", (req, res) => {
    const userId = req.cookies.userId;

    if(!userId){
        return res.send("unauthorized")
    }

    const user = User.find(u => u.id === Number(userId));
    res.send(`welcome ${user.username}`)
})

router.get("/logout", (req, res) => {
    res.clearCookie("userId");
    res.send("logout")
})
module.exports = router;