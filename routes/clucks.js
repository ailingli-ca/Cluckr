const express = require('express');
const knex = require('../db/client');
const router = express.Router();

//-------------- Index to List Clucks
router.get('/',(req,res) =>{

    const faker = require('faker');
    const randomImage = faker.image.nature(50,50,true);

    knex('cluckr')
    .orderBy('created_at','desc')
    .then(clucks =>{
        res.render('clucks/index',{clucks:clucks,randomImage:randomImage})
    })
})

//-------------- Create New Clucks
router.get('/new',(req,res) =>{
    res.render('clucks/new', {cluck:false})
})


router.post('/',(req,res) =>{
    knex('cluckr')
    .insert({
        content: req.body.content,
        image_url: req.body.image_url,
        username: req.cookies.username
    })
    .returning('*')
    .then(clucks =>{
        const cluck = clucks[0];
        res.redirect('/clucks')
    })
})


friendlyTime = function (previous) {
    let current = new Date();
    let timeDiff = current.getTime() - previous.getTime();

    const oneMin = 1000 * 60;
    const oneHour = oneMin * 60;
    const oneDay = oneHour * 24;

    let dayDiff = Math.floor(timeDiff/ (1000 * 60 * 60 * 24));
    let hourDiff = Math.floor(timeDiff/ (1000 * 60 * 60))
    let minDiff = Math.floor(timeDiff/ (1000 * 60))

    if (timeDiff < oneMin) {
        return "Just now";
    } else if (timeDiff > oneMin && timeDiff < oneHour) {
        return minDiff === 1 ? `1 minute ago`:`${minDiff} minutes ago`;
    } else if (timeDiff > oneHour && timeDiff < oneDay) {
        return hourDiff === 1 ? `1 hour ago`:`${hourDiff} hours ago`;
    } else if (timeDiff > oneDay){
        return dayDiff === 1 ? `1 day ago`:`${dayDiff} days ago`;
    }    
}

createTag = function (newTag) {
    let tag = {}
    const words = cluck.content.split(" ");
    for (let i = 0; i < words.length; i++) {
        if (words.startswith("#")){
            tag[i] = tag[i] ? tag[i]+1: 1;
        }
    }
}

module.exports = router
