'use strict';
//import faker from 'faker'
const faker = require('faker');
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();
const userAdmin = ({
    email:faker.unique(faker.internet.email),
    firstname:faker.name.firstName(),
    lastname:faker.name.lastName(),
    password:faker.internet.password(8),
    role:'ADMIN'
})
const users=[...Array(10)].map((user)=>({
    email:faker.unique(faker.internet.email),
    firstname:faker.name.firstName(),
    lastname:faker.name.lastName(),
    password:faker.internet.password(8)
}))
const posts=[...Array(100)].map((post)=>({
    title :faker.name.title(),
    content :faker.lorem.sentences(),
    photos : faker.image.imageUrl(),
    createdAt : faker.date.recent(),
    updateAt  : faker.date.recent(),
    published : faker.random.boolean(),
    autorId : faker.random.arrayElement([1,2,3,4,5,6,7,8,9,10]),
}))
const categorys =[...Array(10)].map((Category)=>({
    name:faker.name.title()
}))

async function main()
{
    console.log("delete all data");
    const comment = await prisma.comment.deleteMany();
    const post= await prisma.post.deleteMany();
    const categorie= await prisma.category.deleteMany();
    const userde=await prisma.user.deleteMany();
    console.log("Start seeding ....");
    for (let i=0;i<10;i++)
     {
         const userSeed=await prisma.user.create({
             data:users[i]
         });
         const categoryAdd =await prisma.category.create({
             data:categorys[i]
         })
         console.log("Created user with id"+ userSeed.id +"& category with id"+ categoryAdd.id )
     }
     for (let i=0;i<100;i++)
     {
         const postsAdd=await prisma.post.create({
             data:posts[i]
         });
         for(let i=0;i<20;i++)
         {
             const comment =await prisma.comment.create({
                 data: 
                 {
                    email: faker.internet.email(),
                    contenu : faker.lorem.sentences(),
                    postId : postsAdd.id
                 }
             })
         }
         console.log("Created post with id"+ postsAdd.id)
     }
     const adminSeed=await prisma.user.create({data:userAdmin})
     console.log("Created admin with id "+ adminSeed.id)
     console.log("seeding finished");
}
main().catch((e) =>{
    console.error(e);
    process.exit(1);
}).finally(async()=>{
    await prisma.$disconnect();
});