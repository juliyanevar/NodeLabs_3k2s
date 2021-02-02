const redis = require("redis");

const sub_client = redis.createClient('//redis-16751.c9.us-east-1-4.ec2.cloud.redislabs.com:16751',
    {password: 'xP7qlIWbgjUP0DN6VFO6FexeLeMNmoir'});

sub_client.on('subscribe', (channel, count) => {
    console.log('subscribe:', ' channel = ', channel, 'count = ', count);
});
sub_client.on('message', (channel, message) => {
    console.log('sub channel: ' + channel + ': ' + message);
});

sub_client.subscribe('channel-01');

setTimeout(() => {
    sub_client.unsubscribe();
    sub_client.quit()
}, 60000);