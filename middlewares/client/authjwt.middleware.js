// const jwt = require("jsonwebtoken");

// module.exports.authenticateToken=(req,res,next)=>{
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
  
//     if (token == null) 
//         return res.redirect(`/user/login`);
  
//     jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
//         console.log(err);
//         if (err) 
//             res.redirect(`/user/login`);
//       req.user = user
//       next()
//     })
//   }