import jwt from "jsonwebtoken";

export default async function isAuth(req, res, next) {
  try {
    //CHECK IF AUTHORIZATION PROPERTY EXISTS IN THE REQUEST
    if (!req.headers.authorization) {
      return res
        .status(401)
        .json({ message: "No token was provided in headers" });
    }

    //AT THIS POINT WE KNOW THE TOKEN EXISTS
    //SO WE CAPTURE IT AND STORE IT IN TOKEN VARIABLE
    //split because the token will be like this:
    // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjp7InVzZXIiOnsiX2lkIjoiNjY2YzkxYmVlYzI3MGRlNmNmMzEwNDdkIiwidXNlcm5hbWUiOiJkYW5pYm95MjAwMyIsIm"
    const token = req.headers.authorization.split(" ")[1];

    //just one more checking if the token is there after capturing from req.headers
    if (!token) {
      return res
        .status(401)
        .json({ message: "No token was provided (after Bearer)" });
    }

    //verify from JWT verifies if the token exists, is valid, and if so, decodes it back into a object
    const verified = jwt.verify(token, process.env.TOKEN_SIGN_SECRET);

    //we then assign a custom req property called user
    //and the value will be the object from the token
    req.user = verified.payload;

    //since it's a middleware we have to call next() so the route runs
    next();
  } catch (error) {
    console.log(error);
    //this error is checking for a specific error message
    //this error means that the JWT is not there or is not valid
    if (error.message === "jwt malformed") {
      return res
        .status(401)
        .json({ message: "No token was provided (malformed)" });
    }
    // We catch the error here and return a 401 status code and an error message
    // The middleware throws an error if unable to validate the token. It throws an error if:
    // 1. There is no token
    // 2. Token is invalid
    // 3. There is no headers or authorization in req (no token)
    res.status(401).json("token not provided or not valid");
  }
}
