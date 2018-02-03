import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import validator from 'validatorjs';
import models from '../../../models/';

const { User } = models;
let token;
const dberror = 'Something went wrong querying the database. Failure occured while attempting to ';

export default {
  list(req, res) {
    User
      .findAll({
        attributes: ['userId', 'userName'],
      })
      .then((user) => {
        if (!user) {
          res.status(404).json({
            error: {
              message: 'User Not Found',
            }
          });
        } else {
          res.status(200).json({
            message: 'All users',
            data: user
          });
        }
      })
      .catch(error => res.status(500).json({
        error: {
          message: error
        }
      }));
  },

  listOne(req, res) {
    if (req.params.userId !== req.decoded.id) {
      res.status(401).json({
        error: {
          message: 'You do not have access to view other users detailed information.',
        }
      });
    } else {
      User
        .findById(req.decoded.id)
        .then((user) => {
          res.status(200).json({
            message: 'User',
            data: user
          });
        })
        .catch(() => res.status(500).json({
          error: {
            message: `${dberror}find the user on the datadase`
          }
        }));
    }
  },

  async signup(req, res) {
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
      res.status(400).json({
        error: {
          message: isValid.errors.all()
        }
      });
    } else {
      let response;
      await User
        .find({
          where: {
            userName: req.body.userName
          }
        })
        .then((user) => {
          if (user) {
            response = {
              error: {
                message: user.userName.concat(' has already been taken'),
              }
            };
          }
        });
      await User
        .find({
          where: {
            email: req.body.email
          }
        })
        .then((user) => {
          if (user) {
            response = {
              error: {
                message: 'An account has already been created for '.concat(user.email),
              }
            };
          }
        });
      if (response) {
        res.status(409).json(response);
      } else {
        User
          .create({
            userName: req.body.userName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password.trim(), bcrypt.genSaltSync(8)),
            firstName: req.body.firstName,
            lastName: req.body.lastName,
          })
          .then((user) => {
            const day = 60 * 60 * 24; // expires in 24 hours

            // create a token with only our given payload
            token = jwt.sign(
              { id: user.userId },
              process.env.JWT_SEC_KEY,
              {
                expiresIn: day
              }
            );

            res.status(201).json({
              message: 'User '.concat(user.userName, '\' account has successfully been created.'),
              userName: user.userName,
              token,
              expiresIn: day
            });
          })
          .catch(() => res.status(500).json({
            error: {
              message: `${dberror}create the user on the datadase`
            }
          }));
      }
    }
  },

  signin(req, res) {
    const rules = {
      userName: 'required|string',
      password: 'required|alpha_dash',
    };

    const isValid = new validator(req.body, rules);
    if (isValid.fails()) {
      res.status(400).json({
        error: {
          message: isValid.errors.all()
        }
      });
    } else {
      User
        .find({
          where: {
            userName: req.body.userName
          }
        })
        .then((user) => {
          if (!user) {
            res.status(404).json({
              error: {
                message: 'User Not Found',
              }
            });
          } else if (!bcrypt.compareSync(req.body.password.trim(), user.password)) {
            res.status(404).json({
              error: {
                message: 'The username and password do not match our records.'
              }
            });
          } else {
            const day = 60 * 60 * 24; // expires in 24 hours

            // create a token with only our given payload
            token = jwt.sign(
              { id: user.userId },
              process.env.JWT_SEC_KEY,
              {
                expiresIn: day
              }
            );

            res.status(200).json({
              success: {
                message: 'User authenticated',
              },
              userName: user.userName,
              imageUrl: user.imageUrl,
              token,
              expiresIn: day
            });
          }
        })
        .catch(() => res.status(500).json({
          error: {
            message: `${dberror}find the user on the datadase`
          }
        }));
    }
  },

  update(req, res) {
    if (req.params.userId !== req.decoded.id) {
      res.status(401).json({
        error: {
          message: 'You cannot alter records that do not belong to you.',
        }
      });
    } else {
      User
        .findById(req.decoded.id)
        .then((user) => {
          if (!user) {
            res.status(404).json({
              error: {
                message: 'User Not Found',
              }
            });
          } else {
            user
              .update({ fields: Object.keys(req.body) })
              .then(() => res.status(202).json({
                message: user.userName.concat('\'s account has successfully been updated.'),
                data: user
              }))
              .catch(() => res.status(500).json({
                error: {
                  message: `${dberror}update the user details on the datadase`
                }
              }));
          }
        })
        .catch(() => res.status(500).json({
          error: {
            message: `${dberror}find the user on the datadase`
          }
        }));
    }
  }
};
