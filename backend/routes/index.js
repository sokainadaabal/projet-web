const express=require('express')
const router =express.Router()

/* GET Article. */
router.get('/',(req, res)=> {
    res.end('Index Page');
  })
router.get('/login',(req, res)=> {
    res.render('login')
  })

  module.exports = router;
