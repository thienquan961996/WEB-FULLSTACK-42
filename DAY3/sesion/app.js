const fs = require('fs')
const isOdd = require('is-odd');
//bước 1 : đọc file
const data = fs.readFileSync('./odd.txt' , {encoding : 'utf8'});

console.log(data);

// bước 2 :chuyển string ra mảng các số

const numbers = data.split(' ').map(x => parseInt(x))

//bước 3 : đếm

let count = 0;
numbers.forEach(x => {
    if(isOdd(x)){
        count++
    }
})
console.log(count);

//bước4: ghi vào file

fs.writeFileSync('result.txt', count + '')

