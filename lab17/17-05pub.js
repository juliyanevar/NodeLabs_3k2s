const redis = require("redis");

const pub_client = redis.createClient('//redis-16751.c9.us-east-1-4.ec2.cloud.redislabs.com:16751',
    {password: 'xP7qlIWbgjUP0DN6VFO6FexeLeMNmoir'});

pub_client.publish('channel-01', 'from pub_client message 1');
pub_client.publish('channel-01', 'from pub_client message 2');

setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 3'), 10000);
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 4'), 20000);
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 5'), 30000);
setTimeout(() => pub_client.publish('channel-01', 'from pub_client message 6'), 40000);

setTimeout(() => pub_client.quit(), 60000);