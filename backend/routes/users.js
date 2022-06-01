const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
const { cookie, send } = require("express/lib/response");
var router = express.Router();
const auth=require("../middleware/auth");
/* Authentification */
const bcrypt = require('bcrypt')
const jwt  = require('jsonwebtoken')
const _  = require('lodash');

/* obtenir tous les utilisateurs */
/*authors */
router.get("/all/author", async (req, res)=> 
{
  const users= await prisma.user.findMany({
    where:{
      role:"AUTHOR"
    }
  })
  res.json(users); 
});
/*admin */
router.get("/all/admin", async (req, res)=> 
{
  const users= await prisma.user.findMany({
    where:{
      role:"ADMIN"
    }
  })
  res.json(users); 
});
/*all */
router.get("/all", async (req, res)=> 
{
  const users= await prisma.user.findMany();
  res.json(users); 
});

router.get("/", async (req, res)=> {
  let { skip, take } = req.query;
  skip = skip || 0;
  take = take || 10;
  const users= await prisma.user.findMany({
    skip:skip ,
    take:take
  })
  res.json(users); 
});
/*authentification pour un utilisateur*/
router.post('/signin',async (req,res)=>{
 const loginUser=await prisma.user.findFirst({
   where:{email:req.body.email}
 })
 if(loginUser==null)
 {
  res.send(JSON.stringify({"status": 404, "error": 'Not user with that email', "token": null})).end();
 }
 const val=await bcrypt.compare(req.body.password, loginUser.password);
   if(!val)
   {
    res.send(JSON.stringify({"status": 404, "error": 'Incorrect password', "token": null})).end();
   }
   else {
    const token = jwt.sign({
      id:loginUser.id,
      email:loginUser.email
    }, 
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    });
    
    res.cookie("jwt", token, {
      httpOnly: true,
     
    });
    res.send({token,loginUser});
   }
 
});
/* Inscription d'un utilisateur  Author*/
router.post('/signup',async(req,res)=>{
  const {email,firstname,lastname,password}=req.body
  const addUser=await prisma.user.create({
    data:{
      email,
      firstname,
      lastname,
      password:await bcrypt.hash(password,8)
    }
  })
  // Create token
  const token = jwt.sign(
    {addUser: _.pick(addUser[0], ['id', 'email']), },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );
 
  if(addUser)
  {
    res.status(200)
    res.json(addUser)
  }
  else{
    res.status(500)
    res.send("Erreur user not adding")
  }
});
router.get('/logout',async(req,res)=>{
  var user = {email: request.body.email, password: request.body.password };  
  var token = jwt.sign(user, 'My Super Secret', {expiresInMinutes: 60});
  response.json({token: token});
})
/* Inscription d'un utilisateur  Admin*/
router.post('/signUpA',async(req,res)=>{
  const {email,firstname,lastname,password}=req.body
  const addUser=await prisma.user.create({
    data:{
      email,
      firstname,
      lastname,
      password:await bcrypt.hash(password,8),
      role:'ADMIN'
    }
  })
  // Create token
  const token = jwt.sign(
    {addUser: _.pick(addUser[0], ['id', 'email']), },
    process.env.TOKEN_KEY,
    {
      expiresIn: "2h",
    }
  );

  if(addUser)
  {
    res.status(200)
    res.json(addUser)
  }
  else{
    res.status(500)
    res.send("Erreur user not adding")
  }
});
/* Recherche d'un utilisateur */
router.get("/:id",async (req, res)=> {
  const {id}=req.params
  const user = await prisma.user.findUnique({
    where:{
      id:Number(id),
    },
  });
  if(user==null) {
    res.status(400)
    res.send('not exit')
  }
  else if(user.role=="AUTHOR") 
  {
    res.status(200)
    res.json(user)
  }
  else if(user.role=="ADMIN") 
  {
    res.status(400)
    res.send('You dont have a acces');
  }
});
/* Recherche d'un utilisateur par Email */
router.get("/email/:email",async (req, res)=> {
  const {email}=req.params
  const user = await prisma.user.findUnique({
    where:{
      email:email,
    },
  });
  if(user==null) {
    res.status(400)
    res.send('not exit')
  }
  else if(user.role=="AUTHOR") 
  {
    res.status(200)
    res.json(user)
  }
  else if(user.role=="ADMIN") 
  {
    res.status(400)
    res.send('You dont have a acces');
  }
});
/* Modification de utilisateur */
router.patch("/update", async (req, res) => {
  const {email,firstname,lastname,password}=req.body;
  const id1= await prisma.user.findUnique({
    where:{
      email:email
    }
  });
  const user = await prisma.user.update({
    where: { id: Number(id1.id) },
    data: {
      email,
      firstname,
      lastname,
      password:await bcrypt.hash(password,8)  
    }
  });
  console.log(req.body);
  res.send(user);
});
/* Suppression d'un utilisatuer */
router.delete('/:id',async (req,res)=>{
  const user = await prisma.user.findUnique({
    where:{id:Number(req.params.id)}
  });
  if(user == null)
  {
    res.status(400);
    res.send("Ce utilisteur n'existe pas");
  }
  else if(user.role=="AUTHOR")
     {
       const delteuser= await prisma.user.delete({
         where:{id:user.id}
       });
       if(delteuser)
       {
         res.status(200);
         res.send('le compte de ce auteur est supprimer avec succes !!!').end();
       }
       else{
         res.status(400);
         res.send("Erreur");
       }
     }
  else{
     res.status(500);
     res.send("vous avez pas le droit de supprimer ce compte");
  }
})
module.exports = router;
