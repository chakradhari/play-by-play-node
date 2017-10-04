const _ = require('lodash');
const Cat = require('./cat_model.js');
/*Code after Mongo */

module.exports = function(app) {
  app.post('/cats', function(req, res) {
    var newCat = new Cat(req.body);
    newCat.save(function(err) {
      if(err) {
        res.json({info: 'Error during cat create', error: err})
      }
      res.json({info: 'Cat Create Successfully'})
    });
  });

  app.get('/cats', function(req, res) {
    Cat.find(function(err, cats) {
      if(err) {
        res.json({info: 'Error during cat create', error: err})
      }
      res.json({info: 'Cats found', data: cats})
    });
  });

  app.get('/cats/:id', function(req, res) {
    Cat.findById(req.params.id, function(err, cat) {
      if(err) {
        res.json({info: 'Error during cat create', error: err})
      }
      res.json({info: 'Cats found', data: cat})
    })
  })

  app.put('/cats/:id', function(req, res) {
    Cat.findById(req.params.id, function(err, cat) {
      if(err) {
        res.json({info: 'Error during cat create', error: err})
      }

      if(cat) {
        _.merge(cat, req.body);
        cat.save(function(err) {
          if(err) {
            res.json({info: 'Error Occurred while saveing cat', error: err})
          }
          res.json({info: 'Cat updated Successfully'})
        })
      }
    })
  });

  app.delete('/cats/:id', function(req, res) {
    Cat.findByIdAndDelete(req.params.id, function(err) {
      if(err) {
        res.json({info: 'Error Occured while saving cat'})
      }
      res.json({info: 'Cat Deleted Successfully'});
    })
  })
}


/* Code with out mongo*/
/*
module.exports = function(app) {
  _cats = [];

  app.post('/cats', function(req, res) {
    _cats.push(req.body);
    res.json({info: 'Cat Created Successfully'});
  });

  app.get('/cats', function(req, res) {
    res.send(_cats);
  });

  app.get('/cats/:id', function(req, res) {
    res.send(
      _.find(
        cats, {
          name: req.params.id
        }
      )
    );
  });

  app.put('/cats/:id', function(req, res) {
    const index = _.findIndex(
      _cats, { name: req.params.id }
    );
    _.merge(_cats[index], req.body);
    res.json({info: "Cat Updated Successfully"});
  });

  app.delete('/cats/:id', function(req, res) {
    _.remove(_cats, function(cat) {
      return cat.name === req.params.id
    })
  });

}
*/
