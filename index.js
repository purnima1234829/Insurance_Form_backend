const express=require('express');
const cors=require("cors");
require('./db/config');
const Insurance=require("./db/Insurance")
const Person =require("./db/Person");
const Commercial=require('./db/Commercial')
const app=express();

app.use(express.json());
app.use(cors());

app.post('/register',async(req,resp)=>{
    let user=new Person(req.body);
    let result=await user.save();
    resp.send(result);
})
app.post('/add-commercial',async(req,resp)=>{
  let commercial=new Commercial(req.body);
  let result=await commercial.save();
  resp.send(result)
});
app.post('/add-insurance',async(req,resp)=>{
    let insurance=new Insurance(req.body);
    let result=await insurance.save();
    resp.send(result)
  });

  app.get("/insurance",async(req,resp)=>{
    let insurance=await Insurance.find();
    if(insurance.length>0){
        resp.send(insurance)
    }else{
        resp.send({result :"No Products found"})
    }
})
app.get("/search/:key",async(req,resp)=>{
    let result=await Insurance.find({
      "$or":[
          {firstName:{$regex:req.params.key}},
          {lastName:{$regex:req.params.key}}
      ]
    });
    resp.send(result);
  })
app.get("/commercial",async(req,resp)=>{
    let commercial=await Commercial.find();
    if(commercial.length>0){
        resp.send(commercial)
    }else{
        resp.send({result :"No Products found"})
    }
})
app.get("/search/:key",async(req,resp)=>{
  let result=await Commercial.find({
    "$or":[
        {name:{$regex:req.params.key}},
        {company:{$regex:req.params.key}}
    ]
  });
  resp.send(result);
}),
app.get("/insurance/:id",async(req,resp)=>{
    let result= await Insurance.findOne({_id:req.params.id});
    if(result){
        resp.send(result)
    }else{
        resp.send({result:"No Record Found"})
    }
})

app.put("/insurance/:id",async(req,resp)=>{
    let result=await Insurance.updateOne(
        {_id:req.params.id},
        {
            $set :req.body
        }
    )
    resp.send(result)
})

app.listen(5000);