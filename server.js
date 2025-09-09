const express =require('express')
require('dotenv').config()


const app = express()
const port =process.env.PORT || 5000
app.use(express.json())

app.get('/',(req,res)=>res.send('Hello word! lest started book CRUD '))

const books =[{
    id:1,
    title:'Nodejs',
    author:'Rutuja',
    prise:4000,
    edition:'v1.1'
}]
app.get('/getAllBooks',(req,res)=>{
    res.status(200).send({books:books})
})
app.get('/getBooksById/:ID',(req,res)=>{
    console.log(req.params.ID)
    const ID =req.params.ID;
    const index = books.findIndex((b)=>b.id ==ID)
    if( index == -1){
        res.status(400).send({msg:"Book not Found",success:false })
    }else{
        const book=books.find((b)=>b.id ==ID)
        res.status(200).send({book:book, status:true})
    }
})
app.post('/createBook',(req,res)=>{
    console.log(req.body)
    newBook= {
        id:Date.now(),
        title:req.body.title,
        author:req.body.author,
        prise:req.body.prise,
        edition:req.body.edition
    }
    books.push(newBook)
    res.status(200).send({msg:'Book added successfully'})
})
app.delete('/deleteBook/:ID',(req,res)=>{
    const ID =req.params.ID
    const index = books.findIndex((b)=>b.id ==ID)


    if( index == -1){
        res.status(400).send({msg:"Book not Found",success:false })
    }else{
        books.splice(index,1)
        res.status(200).send({msg:'Book added Successfully'})

    }
})

app.put('/updateBook/:ID',(req,res)=>{
    const ID =req.params.ID
    const index = books.findIndex((b)=>b.id ==ID)


    if( index == -1){
        res.status(400).send({msg:"Book not Found",success:false })
    }else{

        books[index].prise=req.body.prise || books[index].prise
         res.status(200).send({msg:'Book update  Successfully'})
    }

})


app.listen(port,()=>console.log(`'Server Started  ${port} !`))

// http://localhost:7777/
// http://localhost:7777/getAllBooks
// http://localhost:7777/getBooksById/1
// http://localhost:7777/createBook