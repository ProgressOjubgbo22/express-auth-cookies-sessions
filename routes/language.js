const express = require('express');
const router = express.Router();

const message = {
    en: "Hello",
    fr: "Bonjour",
    es: "Hola",
    de: "Hallo"
}

router.post("/setlang", (req, res) => {
    const {lang} = req.body;

    if(!message[lang]){
        return res.send("language not found")
    }

    res.cookie("lang", lang,
        {
            httpOnly: true,
            maxAge: 24 * 60 * 60 *1000
        });
        res.send(`language set, ${lang}`)
})

router.get("/getlang", (req, res) => {
    const lang = req.cookies.lang || "en";

   const msg = message[lang];

   res.send(`langauage: ${lang}, message: ${msg}`);
})


module.exports = router;