import jwt from 'jsonwebtoken';

export default (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, process.env.JWT_SEC_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({
          statusCode: 403,
          error: true,
          message: 'Failed to authenticate token.'
        });
      }
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(401).json({
      statusCode: 401,
      error: true,
      message: 'No token provided.'
    });
  }
};
