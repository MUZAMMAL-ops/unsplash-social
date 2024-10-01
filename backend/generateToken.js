const secret = 'serdtgyu'
const jwt = require('jsonwebtoken');


const newToken = (secret,payload) => {
      const theToken =   jwt.sign(payload,secret)
      return theToken
}

const result = newToken(secret,{email:'riazmuzammal350@gmai.com'})
console.log(result);
