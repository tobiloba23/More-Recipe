import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import validator from 'validatorjs';
import models from '../../../models/';

const { User } = models;

export default {
  list(req, res) {
    return User
      .all()
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return res.status(200).send(user);
      })
      .catch(error => res.status(400).send(error));
  },

  signup(req, res) {
    const rules = {
      userName: 'required|string',
      email: 'required|email',
      /* Minimum 8 and maximum 16 characters, at least one uppercase letter,
      one lowercase letter, one number and one special character */
      password: 'required|alpha_dash',
      passwordConfirmation: 'required|same:password',
      firstName: 'required|string',
      lastName: 'required|string',
    };

    const isValid = new validator(req.body, rules);
    if (isValid.fails()) {
      return res.json({ error: isValid.errors.all() });
    }

    return User
      .create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      .then(user => res.status(201).send(user.userName))
      .catch(error => res.status(403).send(error));
  },

  signin(req, res) {
    const rules = {
      userName: 'required|string',
      password: 'required|alpha_dash',
    };

    const isValid = new validator(req.body, rules);
    if (isValid.fails()) {
      return res.json({ error: isValid.errors.all() });
    }

    return User
      .findOne(req.params.userName)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        // password check
        if (!bcrypt.compareSync(req.body.password.trim() || req.query.password, user.password)) {
          return res.status(401).json({ message: 'The username and password do not match our records.' });
        }
        // create a token with only our given payload
        const token = jwt.sign(
          { email: user.email, fullName: user.fullName, userId: user.userId },
          process.env.JWT_SEC_KEY,
          {
            expiresIn: 1440 // expires in 24 hours
          }
        );

        res.header['x-auth'] = token;

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'User authenticated',
          token
        });

        return res.status(200).send({ user, token });
      });
  },

  update(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({ fields: Object.keys(req.body) })
          .then(() => res.status(200).send(user))
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

