const express = require('express')
const router = express.Router()

const Users = [
    {id: 1, name: "Drake", age: 20},
    {id: 2, name: "Rema", age: 24}
]

router.post("/login", (req, res) => {
    const {name, age} = req.body;

    const user = Users.find(u => u.name === name && u.age === Number(age));
    if(!user) return res.send("user not found");

    req.session.user = {name}
    res.send("user logged in")


})

router.get("/profile", (req, res) => {
    if(!req.session.user){
        return res.send("login first")
    }
    res.send(`welcome ${req.session.user.name} home`)
})

router.post("/logout", (req, res) => {
    req.session.destroy(err => {
        if(err) return res.send("error")
   
    res.send("logout")
     })
})
module.exports = router;
