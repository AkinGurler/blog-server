import jwt from "jsonwebtoken"

/* wants to like a post
click the like button => auth middleware (next) ? like controllerrr.. : stop */

const auth=async(req,res,next) =>{ /* do smt move to the next thing */
    try {
        const token =req.headers.authorization.split(" ")[1];
        const isCustomAuth=token.length<500;

        let decodedData;
        
        if(token && isCustomAuth) {
            decodedData=jwt.verify(token,"test");
            req.userID=decodedData?.id
        }else{
            decodedData=jwt.decode(token);
            req.userID=decodedData?.sub;
        }

        next();/* go next operation */
        
    } catch (error) {
        console.log(error)
        
    }
}

export default auth;