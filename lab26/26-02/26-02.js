const {ServerSign, ClientVerify} = require('./26-02m');
const fs = require('fs');

const rs = fs.createReadStream('./26-02.txt');
const rs1 = fs.createReadStream('./26-02.txt');

let ss = new ServerSign();
ss.getSignContext(rs, (signcontext)=>{
    console.log(signcontext);
    let cv = new ClientVerify(signcontext);
    cv.verify(rs1, (result)=>{
        console.log(result)});
});