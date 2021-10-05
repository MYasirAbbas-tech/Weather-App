const hp=require("http");
const fs=require("fs");
const requests=require("requests")

const readFle=fs.readFileSync("home.html","utf-8");

const replaceVal=(tempval,orgval)=>{
    let temperature=tempval.replace("{%tempval%}",orgval.main.temp);
    temperature=temperature.replace("{%tempmin%}",orgval.main.temp_min);
    temperature=temperature.replace("{%tempmax%}",orgval.main.temp_max);
    temperature=temperature.replace("{%city%}",orgval.name);
    temperature=temperature.replace("{%country%}",orgval.sys.country);
    temperature=temperature.replace("{%tempstats%}",orgval.weather[0].main);
    return temperature;
}
const server=hp.createServer((req,res)=>{
if(req.url="/")
{
requests('https://api.openweathermap.org/data/2.5/weather?q=Islamabad&appid=2a55f4d53f893c38c42106bcee07d7c3&units=metric')
.on('data', (chunk)=> {
    const objdata=JSON.parse(chunk);
    const arrdata=[objdata];
    const realtimedata=arrdata.map((val)=>replaceVal(readFle,val)).join("");
    // console.log(realtimedata);

res.write(realtimedata);
})
.on('end', (err)=>{
  if (err) return console.log('connection closed due to errors', err);
 
  res.end();
});
}
});
server.listen(8000,"127.0.0.1");