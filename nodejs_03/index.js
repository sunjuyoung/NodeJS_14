const checkNumber = require('./func');
const {even, odd} = require('./var');

console.log(checkNumber(122));

function checkString(str){
    if(str.length % 2){ //홀수
        return odd;
    }
    return even;
}

console.log(checkString("hello"));
