const express = require('express');

const router = express.Router()

router.get('/sign_in',(req,res)=>{
    res.render('./sign_in',{username:false})
})

router.get('/sign_out',(req,res)=>{
    res.clearCookie('username')
    res.redirect('/clucks')
})

router.post('/sign_in', (req, res) =>{
    const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24 
    const username = req.body.username
    res.cookie('username', username, {maxAge: COOKIE_MAX_AGE})
    res.redirect('/clucks')
})

router.post('/sign_out', (req, res) => {
    res.clearCookie('username');
    res.redirect('/clucks');
});



module.exports = router