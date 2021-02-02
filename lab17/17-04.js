const redis = require("redis");

const client = redis.createClient('//redis-16751.c9.us-east-1-4.ec2.cloud.redislabs.com:16751',
    {password: 'xP7qlIWbgjUP0DN6VFO6FexeLeMNmoir'});

client.on("ready", () => {
    console.log("ready");
    Promise.resolve()
        .then(Hset())
        .then(Hget());
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


function Hset(){
    const time1= Date.now();
    for (let k = 1; k < 10000; k++) {
        client.hset(k, '{id:'+k+', val: "val-'+k+'"}');
    }
    console.log(Date.now()-time1);
}

function Hget(){
    const time1= Date.now();
    for (let k = 1; k < 10000; k++) {
        client.hget(k);
    }
    console.log(Date.now()-time1);
}


client.quit();