const user = require("../models/userModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function getMe(req, res) {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).send({success: 401, message:"Unauthorized"});
    }

    jwt.verify(token, process.env.SECRET, (err, user, name) => {
      if (err) return res.status(403).send({success: 403, message:"Session Expired, try to login again"});
      res.status(201).json({ success: 200, data: {user, name} });
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

module.exports = {
  getMe
};
