// const isOdd = require('is-odd');

// console.log(isOdd(5));
const fs = require('fs');
const str = 'quan';
const str1 = `${1}

web full stack 42
hello
`;

// fs.writeFile('test.txt', str1, (err) =>{
//     if(err) return console.log(err);
//     console.log('success')
// });


// fs.writeFileSync('test.txt, str1')
// console.log('success')
// console.log('success 1');


// fs.readFile('./test.txt', (err,data) =>{
//     if (err) return console.log(err);
//     console.log(data);
// });


fs.readFile('./test.txt', {encoding : 'utf8'}, (err,data) =>{
    if (err) return console.log(err);
    console.log(data);
});