const express = require('express');
const router = express.Router();

router.post("/settheme", (req, res) => {
    const {theme} = req.body;

    if (!['light', 'dark'].includes(theme)) {
        return res.send("must be white or black")
    }
    res.cookie("theme", theme,
        {
            httpOnly: true,
            maxAge: 24 * 60 * 60 *1000
        });
        res.send(`${theme} set`)
})

router.get("/gettheme", (req, res) => {
    const theme = req.cookies.theme || 'light';

    res.send(theme)

})


module.exports = router;