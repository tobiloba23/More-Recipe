import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import validator from 'validatorjs';
import models from '../../../models/';

const { User } = models;

export default {
  list(req, res) {
    return User
      .find({
        attributes: ['userId', 'userName'],
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'User Not Found',
          });
        }
        return res.status(200).json({
          statusCode: 200,
          message: 'All users',
          data: user
        });
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
  },

  listOne(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (user.userId !== req.decoded.id) {
          return res.status(401).json({
            statusCode: 401,
            error: true,
            message: 'You do not have access to view other users detailed information.',
          });
        }
        res.status(200).json({
          statusCode: 200,
          message: 'User',
          data: user
        });
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
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
      console.log(isValid.fails());
      return res.status(400).json({
        statusCode: 400,
        error: true,
        message: isValid.errors.all()
      });
    }

    return User
      .create({
        userName: req.body.userName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password.trim(), bcrypt.genSaltSync(8)),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      .then((user) => {
        // create a token with only our given payload
        const token = jwt.sign(
          { id: user.userId },
          process.env.JWT_SEC_KEY,
          {
            expiresIn: 1440 // expires in 24 hours
          }
        );

        res.status(201).json({
          statusCode: 201,
          message: 'User '.concat(user.userName, ' has successfully been created.'),
          data: user,
          token
        });
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
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
      .find({
        where: {
          userName: req.body.userName
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'User Not Found',
          });
        }
        // password check
        if (!bcrypt.compareSync(req.body.password.trim(), user.password)) {
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'The username and password do not match our records.'
          });
        }
        // create a token with only our given payload
        const token = jwt.sign(
          { id: user.userId },
          process.env.JWT_SEC_KEY,
          {
            expiresIn: 1440 // expires in 24 hours
          }
        );

        // return the information including token as JSON

        return res.json({
          statusCode: 200,
          success: true,
          message: 'User authenticated',
          token
        }).status(200);
      })
      .catch(error => res.status(400).json({
        statusCode: 404,
        error
      }));
  },

  update(req, res) {
    return User
      .findById(req.params.userId)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            statusCode: 404,
            error: true,
            message: 'User Not Found',
          });
        }
        if (user.userId !== req.decoded.id) {
          return res.status(403).json({
            statusCode: 403,
            error: true,
            message: 'You cannot alter records that do not belong to you.',
          });
        }

        return user
          .update({ fields: Object.keys(req.body) })
          .then(() => res.status(202).json({
            statusCode: 202,
            message: user.userName.concat('\'s has successfully been updated.'),
            data: user
          }));
      })
      .catch(error => res.status(400).json({
        statusCode: 400,
        error
      }));
  }
};

