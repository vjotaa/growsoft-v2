var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'secret_key';

exports.ensureAuth =  function(req,res,next){
  if(!req.headers.authorization){
    return res.json({msg: 'No estas autenticado'});
  }
  var token = req.headers.authorization.replace(/['"]+/g,'');  
  try {
    var payload = jwt.decode(token,secret);
    if(payload.exp<=moment().unix()){
      res.json({msg: 'El token a expirado'});
    }
  } catch (error) {
    //console.log(error);
    res.json({msg: 'El token es invalido'});
  }
  req.user = payload;

  next();
};