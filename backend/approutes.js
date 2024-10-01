const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const router = express.Router()
const multer = require('multer');
const {fileUpload, fetchPosts, mapPosts, updateLikes, metaData, getLikes, comments, LoadComments, Userlog, Usersign,verify} = require('./controller');

const upload = multer({dest:'uploads/'})

const jsonParser = bodyParser.json();



router.post('/upload',jsonParser, fileUpload)
// router.get('/fetch-posts', fetchPosts)
router.get('/fetch-posts', fetchPosts)
router.post('/posts-map',jsonParser,mapPosts)
router.patch('/likes',jsonParser,updateLikes)
// router.get('/metadata',jsonParser,metaData)
router.post('/get-like',jsonParser,getLikes)
router.post('/post-comment',jsonParser,comments)
router.get('/load/:load1',LoadComments)
router.post('/login',jsonParser,Userlog)
router.post('/signup',jsonParser,Usersign)
router.post('/Token',jsonParser,verify)





  
module.exports = router;