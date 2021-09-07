const message = require('../models/messagesModel');

const postingController = {};

postingController.postMessage = (req, res, next) => {
  console.log('postingController');
  message.create(
    {
      item: req.body.item,
      created_by: req.body.created_by,
    },
    (err, data) => {
      if (err) {
        //console.log('error in posting', err);

        return next({
          log: err,
          status: 500,
          message: 'error in post message controller',
        });
      } else {
        res.locals.postedItem = data;
        //console.log(data, ' posted to DB');
        return next();
      }
    }
  );
};

postingController.getMessages = (req, res, next) => {
  //console.log('postingController get req');

  message.find({}, (err, data) => {
    if (err) {
      console.log(err);

      return next({
        log: err,
        status: 500,
        message: 'error retrieving messages',
      });
    } else {
      res.locals.messages = data;
      //console.log(data, ' retrieved');

      return next();
    }
  });
};

module.exports = postingController;
