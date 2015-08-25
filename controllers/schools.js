var express = require('express');
var router = express.Router();
var DB = require('../config/connection');
var School = DB.models.School;

function error(response, message) {
  response.status(500);
  response.json({error: message});
}

// get for ALL schools, index

// post for schools (post-MVP using automated scraper)

// get for individual schools, show

// get for individual schools, shows all health reports. We will axe this.



router.get('/schools', function(req, res) {
  School.findAll().then(function(schools){
    res.json(schools);
  })
})

router.get("/schools/:id", function(req, res){
  School.findById(req.params.id).then(function(school){
    if(!school) return error(res, "not found");
    res.json(school);
  });
});

router.get("/schools/:id/health-report", function(req, res){
  School.findById(req.params.id).then(function(school){
    if(!school) return error(res, "not found");
    school.getHealthreport().then(function(healthReport){
      res.json(healthReport);
    });
  });
});


module.exports = router;
