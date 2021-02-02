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

client.quit();