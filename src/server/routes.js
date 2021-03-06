var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/people', getPeople);
router.get('/person/:id', getPerson);
router.get('/racquet', getRacquet)
router.get('/racquet/:id', getTheRacquet);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getPeople(req, res, next) {
  res.status(200).send(data.people);
}

function getRacquet(req,res,next){
  res.status(200).send(data.racquet);
}


function getTheRacquet(req, res, next){
  var id = req.params.id;
  var theRacquet = data.racquet.filter(function(r){
    return r.id === id;
  })
  if (theRacquet) {
    res.status(200).send(theRacquet);
  }

}
function getPerson(req, res, next) {
  var id = +req.params.id;
  var person = data.people.filter(function(p) {
    return p.id === id;
  })[0];

  if (person) {
    res.status(200).send(person);
  } else {
    four0four.send404(req, res, 'person ' + id + ' not found');
  }
}
