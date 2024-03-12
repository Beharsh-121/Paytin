import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();//Middleware of dotenv,  all the environment variables are not usable without this
const JWT_SECRET = process.env.JWT_SECRET;



const authMiddleware = (req, res, next) => {

  const authHeader = req.headers.authorization;
  
  if(!authHeader || !authHeader.startsWith('Bearer')){//if does not have authorization key, or does'nt start with BEARER
    return res.status(403).json({
      message: "header's format is wrong Or does not contain BEARER key"
    });
  }

  
  const token = authHeader.split(' ')[1];//Removes Bearer and gets the real token

  try{
      const decoded = jwt.verify(token, JWT_SECRET);//decoding the token and verifying it

      if(decoded.userId){
        req.userId = decoded.userId;
        next();
      }else{
        return res.status(403).json({
          message: "decoded.userId does'nt exist"
        });
      }
  }catch(err){
    return res.status(403).json({message: "Error due to JWT verification"});
  } 
};

export default authMiddleware;