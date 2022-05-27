const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
const auth=require("../middleware/auth");
/* Obtenir tous le commentaire d'un post */
router.get("/all", async (req, res)=> 
{
  const commentaire= await prisma.comment.findMany({
      where:{
          postId:Number(req.body.postId)
      }
  })
  res.json(commentaire); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
    skip = skip || 1;
    take = take || 10;
  const commentAll= await prisma.comment.findMany({
      skip:skip,
      take:take,
      where:{
        postId:req.body.postId
      }
  })
  if(commentAll) res.json(commentAll)
  else res.sendStatus(400)
})
/* Ajouter un Commentaire */
router.post('/',async(req,res)=>{
    const addComment=await prisma.comment.create({
      data:req.body
    })
    if(addComment)
    {
      res.status(200)
      res.json(addComment)
    }
    else{
      res.status(500)
      res.send("Erreur Ce Commentaire ne peut pas ajouter")
    }
  })
/* Recherche d'un commentaire */
router.get("/:id",async (req, res)=> {
    const {id}=req.params
    const commentFind = await prisma.comment.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(commentFind==null) {
      res.status(400)
      res.send("n'est pas existée")
    }
    else
    {
      res.status(200)
      res.json(commentFind)
    }
  });
/* Recherche Toute les commentaires d'un post */
router.get("/all/:id",async (req, res)=> {
  const {id}=req.params
  const commentFind = await prisma.comment.findMany({
    where:{
      postId:Number(id),
    },
  });
  if(commentFind==null) {
    res.status(400)
    res.send("n'est pas existée")
  }
  else
  {
    res.status(200)
    res.json(commentFind)
  }
});
/* Modification de comment */
router.patch("/update", async (req, res) => {
    const comment= await prisma.comment.update({
      where: { id: Number(req.body.id) },
      data: req.body  
    });
    console.log(req.body);
    res.send(comment);
  });
/* Suppression d'un comment */
router.delete('/:id',async (req,res)=>{
    const comment = await prisma.comment.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(comment == null)
    {
      res.status(400);
      res.send("Ce comment  n'existe pas");
    }
    else
       {
         const commentDelete= await prisma.comment.delete({
           where:{id:comment.id}
         });
         if(commentDelete)
         {
           res.status(200);
           res.send('ce commentaire  est supprimer avec succes !!!').end();
         }
         else{
           res.status(400);
           res.send("Erreur commentaire n'est pas supprimer");
         }
       }
  
  })
module.exports=router;