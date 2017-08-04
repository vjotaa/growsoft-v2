const jwt = require('jwt-simple');
const moment = require('moment');
var secret = 'secret_key';

exports.createToken = function (user){
  let payload = {
    sub:user.id,
    name:user.name,
    lastname:user.lastname,
    email:user.email,
    username:user.username,
    image:user.image,
    iat:moment().unix(),
    exp:moment().unix(30,'days').unix
  }

  return jwt.encode(payload,secret);
}