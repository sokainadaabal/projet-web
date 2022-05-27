const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
var express = require("express");
var router = express.Router();
const auth=require("../middleware/auth");
/* Obtenir tous les catégories */
router.get("/all", async (req, res)=> 
{
  const categorys= await prisma.category.findMany()
  res.json(categorys); 
});
router.get("/",async (req,res)=>{
  let { skip, take } = req.query;
    skip = skip || 1;
    take = take || 10;
  const catAll= await prisma.category.findMany({
      skip:skip,
      take:take
  })
  if(catAll) res.json(catAll)
  else res.sendStatus(400)
})
/* Ajouter une catégorie */
router.post('/',auth,async(req,res)=>{
    const addCate=await prisma.category.create({
      data:req.body
    })
    if(addCate)
    {
      res.status(200)
      res.json(addCate)
    }
    else{
      res.status(500)
      res.send("Erreur Cette categorie existe déja")
    }
  })
/* Recherche d'une catégorie */
router.get("/:id",async (req, res)=> {
    const {id}=req.params
    const category = await prisma.category.findUnique({
      where:{
        id:Number(id),
      },
    });
    if(category==null) {
      res.status(400)
      res.send("n'est pas existée")
    }
    else
    {
      res.status(200)
      res.json(category)
    }
  });
/* Modification d'une catégorie */
router.patch("/update",auth, async (req, res) => {
    const category= await prisma.category.update({
      where: { id: Number(req.body.id) },
      data: req.body  
    });
    console.log(req.body);
    res.send(category);
  });
/* Suppression d'une catégorie */
router.delete('/:id',auth,async (req,res)=>{
    const category = await prisma.category.findUnique({
      where:{id:Number(req.params.id)}
    });
    if(category == null)
    {
      res.status(400);
      res.send("Cette categorie  n'existe pas");
    }
    else
       {
         const deleteCat= await prisma.category.delete({
           where:{id:category.id}
         });
         if(deleteCat)
         {
           res.status(200);
           res.send('cette catégorie  est supprimer avec succes !!!').end();
         }
         else{
           res.status(400);
           res.send("Erreur supprimer d'abord tout les post qui contient cette catégorie");
         }
       }
  
  })
module.exports=router;