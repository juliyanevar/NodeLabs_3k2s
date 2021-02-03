const redis = require("redis");

const client = redis.createClient('//redis-16751.c9.us-east-1-4.ec2.cloud.redislabs.com:16751',
    {password: 'xP7qlIWbgjUP0DN6VFO6FexeLeMNmoir'});

client.on("ready", () => {
    console.log("ready");

});
client.on("error", (err) => {
    console.log("error " + err);
});
client.on("connect", () => {
    console.log("connect");
});
client.on("end", () => {
    console.log("end");
});


function Set(){
    const time1= Date.now();
    for (let k = 1; k <= 10000; k++) {
        client.set(k, 'set'+k);
    }
    console.log(Date.now()-time1);
}

function Get(){
    const time1= Date.now();
    for (let k = 1; k <= 10000; k++) {
        client.get(k/*,(err, result)=>{
            console.log(k+':', 'err=', err, 'result=', result)}*/);
    }
    console.log(Date.now()-time1);
}

function Del(){
    const time1= Date.now();
    for (let k = 1; k <= 10000; k++) {
        client.del(k/*,(err, result)=>{
            console.log(k+':', 'err=', err, 'result=', result)}*/);
    }
    console.log(Date.now()-time1);
}

Promise.resolve()
    .then(Set())
    .then(Get())
    .then(Del());

client.quit();