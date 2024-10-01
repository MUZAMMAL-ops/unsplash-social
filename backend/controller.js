const express = require('express');
const app = express();
const db = require('./dbconnection');
const multer = require('multer');
var fs = require('fs');
const jwt = require('jsonwebtoken');
const { error } = require('console');
const secret = 'serdtgyu'
const { yellow, red, cyan } = require('kleur');
const io = require('./index.js')
const cheerio = require('cheerio')
const axios = require('axios')
const upload = multer({dest:'uploads/'})
const bcrypt = require('bcrypt');
const { constants } = require('crypto');



const fileUpload = (req,res) => {
    const {url,Description} = req.body;
    console.log('Description',Description);
    
    // console.log(req.headers['authorization']);
    const split1 = req.headers['authorization']
    console.log(split1);
    const split2 = split1.split(' ')
    
    const Token = jwt.verify(split2[1],secret,function(err,decoded) {
        if (err) {
            res.status(401).send({Error_message:'Error while verifying the token'});
            
        }if (decoded) {
             
    if (!url) {
        
        return res.status(401).send({Error:'No file found'}) 
   }
//    const readTheFile =  fs.readFile(req.file.path,'binary',(err,data) =>{
//     if (err) {
//         res.status(401).send({error: 'Error while reading'})
//     }
    
   const query1 =  `insert into posts6(Photos,Email,Description)values(? ,?,?)`
   db.query(query1,[url,decoded.email,Description])
   .then((data) => {
    
    res.status(200).send({message:'Image Stored Successfully'})
   }).catch((error) => {
    console.log(yellow(error));
    
    res.status(401).send(error)
   })
    
     
   
            
        }
        
    })
   
}




const fetchPosts = (req,res) => {
    const AuthToken = req.headers['authorization'];
    console.log('AuthToken!',AuthToken);
    
    const sortToken = AuthToken.split(' ');

    const verify_Token = jwt.verify(sortToken[1],secret,function(err,decoded) {
        if (err) {
            return res.status(401).send({Error:'An Error occured while verifying Token !'})
        }
            const query2 = `SELECT p.*, p.Description 
            FROM posts6 p 
           LEFT JOIN posts_users pv ON p.ID = pv.post_id AND pv.email = '${decoded.email}'
          WHERE pv.post_id IS NULL
          LIMIT 1;`

       db.query(query2)
       .then((data) => {
        console.log(data[0]);
        if(data[0].length>0){
        const posts = data[0].map(post => ({
            ID: post.ID,
            Photos: post.Photos, // Convert binary data to base64
            Email: post.Email,
            Likes: post.Likes,
            Description:post.Description
            // created_at: post.created_at
        }));
        if (posts) {
            res.status(200).send(posts);

        }
    }else {

        
            const query3 = `select * from posts6 order by rand() Limit 1`
            db.query(query3)
            .then((result) => {
                const staticPosts = result[0].map(post => ({
                    ID: post.ID,
                    Photos: post.Photos, // Convert binary data to base64
                    Email: post.Email,
                    Likes: post.Likes,
                    Description:post.Description

                    // created_at: post.created_at
                
            }))
            res.status(200).send(staticPosts)
           
            })
            .catch((err) => {
                res.status(401).send({Error_message:'some error occured'})
            
        })

    
       }})
       .catch((err) => {
        console.log(err);
        
             res.status(401).send({Error_Message:"SomeError Occured"})
       })
            
        
      
        
      

        
    })


}


const mapPosts = (req,res) => {
    const AuthToken = req.headers['authorization'];
    console.log('AuthToken',AuthToken);
    
    const { id } = req.body;
    if (!id) {
        return res.status(401).send({message:'No id provided'})
    }
    
    const sortToken = AuthToken.split(' ');

    const verify_Token = jwt.verify(sortToken[1],secret, function(err, decoded) {
        if (err) {
            return res.status(400).send({Error_message:'USER COULD NOT BE VERIFIED'})
        }else {
            const query4 = `insert into posts_users(email,post_id)
            values('${decoded.email}','${id}')`
        db.query(query4)
        .then((result) => {
            res.status(200).send({success:'true'})
        })
        .catch((err) => {
            res.status(401).send(err)
        })

    }
        
    })
}


const connsocket = (socket_io) =>{
    const token = socket_io.handshake.headers['authorization']
    console.log('token',token);
    const tokenArray = token.split(' ')
    // console.log('token',token);
    
    const verifyToken = jwt.verify(tokenArray[1],secret, function(err, decoded) {
        if (err) {
            return socket_io.send('error occured')
        }
        const query5 = ` SELECT p.ID, p.Photos, p.Email, p.Likes, p.created_at, p.Description
            FROM posts6 p
            LEFT JOIN posts_users pv ON p.ID = pv.post_id AND pv.email = '${decoded.email}'
            WHERE pv.post_id IS NULL
            LIMIT 1;`
        
     db.query(query5)
     .then((data) => {
        if(data[0].length>0){
            const posts = data[0].map(post => ({
                ID: post.ID,
                Photos: post.Photos, // Convert binary data to base64
                Email: post.Email,
                Likes: post.Likes,
                Description:post.Description

                // created_at: post.created_at
            }));
                socket_io.send(posts)

            
        }else{
            
            const query3 = `select * from posts6 order by rand() Limit 1`
            db.query(query3)
            .then((result) => {
                const staticPosts = result[0].map(post => ({
                    ID: post.ID,
                    Photos: post.Photos, // Convert binary data to base64
                    Email: post.Email,
                    Likes: post.Likes,
                    Description:post.Description

                    // created_at: post.created_at
                
            }))
            socket_io.send(staticPosts)
        })
        .catch((error) => {
            socket_io.send({Error_message:'Some Error Occured While Retrieving Data !!'})
        })
    }})
     .catch((error) => {
        socket_io.send(error)
     })
    })
   
}


const updateLikes = (req,res) => {
    const {id} = req.body;
    console.log(id)
 const query6 = 'UPDATE posts6 SET Likes = Likes + 1 WHERE ID = ?';

db.query(query6,[id])
.then((result) => {
    console.log(result);
    
    res.send({success:'true'})
})
.catch((err) => {
    console.log(err);
    
    res.send({Error_message:'Some E rror Occured !'})
})
}


const getLikes = (req,res) => {
    const {id} = req.body;
    const query7 = `select Likes from posts6 where ID = ${id}`
    db.query(query7)
    .then((result) => {
        res.status(200).send(result)
    })
    .catch((error) => {
        res.status(401).send({message:"some error"})
    })
}


const comments = (req,res) => {
    const {Comment,id} = req.body;
    const AuthToken = req.headers['authorization'];

    const sortToken = AuthToken.split(' ');
    const verify_Token = jwt.verify(sortToken[1],secret,function(err,decoded){
           if (err) {
             return res.status(401).send({messaga:"Token could not be verified"})
           }
           const query8 = `insert into comments(ID,Email,comment_text)values(?,?,?)`
           db.query(query8,[id,decoded.email,Comment])
           .then((result)=>{
            res.status(200).send({message:"Comment Stored"})
           })
           .catch((err)=> {
            console.log(err);
            
            res.status(401).send({message:"some error occured"})
           })
    })

}

const LoadComments = (req,res) => {
     const id = req.params.load1;
     console.log('params id',id);

     const query9 = `select comment_id,Email, comment_text from comments where ID = ${id} `
     db.query(query9)
     .then((response) => {
        console.log(response);
            res.send(response[0])

        
        
     })
     .catch((error) => {
        console.log('error',error);
        
        res.status(401).json({Error_Message:"Some error occured"})
     })
}


const Userlog = (req, res) => {
    const { email, Password } = req.body;
    const payload1 = {
        Email:`'${email}'`

    }
     const TOKEN4 = jwt.sign(payload1,secret)

    const query6 = `select * from users0 where Email='${email}'`;
    db.query(query6)
    .then((result)=>{
        console.log(result)
        if(result[0][0]==null){
             res.send({message:'Please register yourself'})
        }else{
            bcrypt.compare(Password,result[0][0].password,function(err,result){
                if(result==true){
                  // console.log({'result':result});
                    res.json({Token:TOKEN4})
                }else{
                    res.send({message:'Your Email or Password is incorrect!'})
                }
            })
        }
        

    })
    .catch((Error)=>{
        res.status(401).send('error')
    })


} 

const Usersign = (req,res)=> {
    saltRounds = 10
    const {Email,Password} = req.body;
    // console.log(req.body);
    const query2 = `select Email from users0 where Email = '${Email}'`
    db.query(query2)
    .then((data)=>{
        console.log(data);
        if(data[0].length>0){
            res.send({message:'Please write a unique Email Address'})
        }else{
           const payload2 = {
               Email:  `'${Email}'`
            }
        
            
            let Token3 = jwt.sign(payload2,secret)
        bcrypt.genSalt(saltRounds,function(err,salt){
            if (err) {
                return res.status(500).send("Error generating salt");
            }
            bcrypt.hash(Password, salt, function(err,hash){
                if (err) {
                    return res.status(500).send("Error generating salt1");
                }
                
                // let currentDate1 = new Date();
                // let formattedDate1 = currentDate1.toISOString().slice(0, 19).replace('T', ' ');
                const query3 =  `insert into users0(Email,password) values('${Email}','${hash}')`
         db.query(query3)
        .then((result) => {
        return res.send({Token:Token3}).status(201)
            
        }).catch((err) => {
            return res.status(401).send("some error occured")      

                });
            })
            
        })
        }
  
    })
    .catch((error)=>{
        res.status(401).send("some error occured")
    })
    
        }

const verify = (req,res) => {
    const {Token} = req.body;
   
    const verify = jwt.verify(Token,secret, function(err,decoded) {
        if (err) {
            console.log('err');

            res.status(401).send('Some error occur')
        }else {
            console.log('err1');

            res.status(200).send('Token verified')
        }
})
}
       

module.exports = {
    fileUpload,
    fetchPosts,
    mapPosts,
    connsocket,
    updateLikes,
    getLikes,
    comments,
    LoadComments,
    Userlog,
    Usersign,
    verify
};

