import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import models from '../../../models/';

const { User } = models;

export default {
  list(req, res) {
    // let returnData;
    // let offset = 0;
    // let count = 500;

    // if (req.query && req.query.offset) {
    //   offset = parseInt(req.query.offset, 10);
    // }

    // if (req.query && req.query.count) {
    //   count = parseInt(req.query.count, 10);
    // }

    // if (User) returnData = User.slice(offset, offset + count);

    // if (req.query && req.query.sort) {
    //   if (req.query.order && req.query.order === 'asc') {
    //     returnData.sort((a, b) => a.upvotes - b.upvotes);
    //   } else if (req.query.order && req.query.order === 'desc') {
    //     returnData.sort((a, b) => b.upvotes - a.upvotes);
    //   } else {
    //     res.status(404).send('Not Found: Order of sorting does not exist.');
    //   }
    // }


    // return User
    //   .all({
    //     include: [{
    //       model: RecipeReview,
    //       as: 'recipeReviews',
    //     }, {
    //       model: Recipe,
    //       as: 'recipes',
    //     }, {
    //       model: RecipeCatalogue,
    //       as: 'recipeCatalogues',
    //     }, {
    //       model: CatalogueReview,
    //       as: 'catalogueReviews',
    //     }, {
    //       model: UserFavourites,
    //       as: 'userFavourites',
    //     }, {
    //       model: UserRoles,
    //       as: 'userRoles',
    //     }, {

    //     }]
    //   })

    return User
    //   .all()
      .sequelize.query('SELECT "id", "userName", "eMail", "password", "firstName", "lastName", "created_at", "updated_at" FROM "Users" AS "User" LIMIT 1;')
      .then((user) => {
        user = user[0][0];
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
    return User
      .create({
        userName: req.body.userName,
        eMail: req.body.eMail,
        password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8)),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      })
      .then(user => res.status(201).send(user))
      .catch(error => res.status(403).send(error));
  },

  login(req, res) {
    return User
    //   .all()
      .sequelize.query('SELECT "id", "userName", "eMail", "password", "firstName", "lastName", "created_at", "updated_at" FROM "Users" WHERE "userName" LIKE \''.concat(req.body.userName, '\''))
      .then((user) => {
        user = user[0][0];
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        // password check
        if (!bcrypt.compareSync(req.body.password, user.password)) {
          return res.status(401).json({ message: 'The username and password do not match our record.' });
        }
        // create a token with only our given payload
        const token = jwt.sign({ email: user.eMail, fullName: user.fullName, id: user.id }, 'RESTFULAPIs', {
          expiresIn: 100 // expires in 24 hours
        });

        req.token = token;

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token
        });

        return res.status(200).send(user);
      });
  },

  update(req, res) {
    return User
      .findById(req.params.Id)
      .then((user) => {
        if (!user) {
          return res.status(404).send({
            message: 'User Not Found',
          });
        }
        return user
          .update({ fields: Object.keys(req.body) })
          .then(() => res.status(200).send(user)) // Send back the updated user.
          .catch(error => res.status(400).send(error));
      })
      .catch(error => res.status(400).send(error));
  }
};

