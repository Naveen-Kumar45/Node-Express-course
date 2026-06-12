const fs = require('fs');

for (i = 0; i < 100000; i++){
    fs.writeFileSync('./content/big.txt', `Hello World ${i}\n`, {flag : 'a'})
}