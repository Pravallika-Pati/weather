const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apikey="ec6b6e897503c0b9d4f062f996991f6e";
  const unit="metric";
 const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&units="+unit+"&appid="+apikey;

 https.get(url,function(response){
   // console.log(response.statusCode);

   response.on("data",function(data){
     const weatherdata=JSON.parse(data);
     const temp=weatherdata.main.temp;
     const des=weatherdata.weather[0].description;
     const icon=weatherdata.weather[0].icon;
     const imageURL="http://openweathermap.org/img/wn/"+ icon +"@2x.png";
      res.write("<h1> The temperature in " +query+" is "+temp+" degree celcius</h1>");
     res.write("<h3>The weather currently in "+query+" is "+des+ "</h3>");

       res.write("<img src="+imageURL+">");
       res.send();
   })
 })
})

app.listen(3000,function(){
  console.log("Server started.");
})
