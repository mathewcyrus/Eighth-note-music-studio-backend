import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  // console.log(token);
  if (!token) {
    res.status(401).send("You are not authenticated");
  } else {
    jwt.verify(token, process.env.JSON_TOKEN, (err, user) => {
      if (err) {
        res.status(403).send("Token is not valid");
      } else {
        req.user = user;
        // console.log(user);
        // next();
      }
    });
  }
};

export const verifyUser = (req, res, next) => {
  console.log(req.user);
  console.log(req.params);
  if (req.user.id === req.params || req.user.isAdmin === true) {
  } else {
    res.status(403).send("You are not the owner or admin");
  }
};

export const verifyAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin === true) {
    next();
  } else {
    res.status(403).send("You are not an admin");
  }
};
