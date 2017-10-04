import moment from 'moment';
import jwt from 'jwt-simple';

const encodeToken = (user) => {
  const playload = {
    exp: moment().add(14, 'days').unix(),
    iat: moment().unix(),
    sub: user.id
  };
  return jwt.encode(playload, process.env.TOKEN_SECRET);
};

export default encodeToken;
