var faker = require('faker');
var fs = require('fs');
var _ = require('underscore');
var util = require('./util.js');

var size = 100,
    id = 0,
    path = 'sample_collection.csv';

var getRandomCollectionType = util.randomValue(
  ['Case-control', 'Cohort', 'Cross-sectional', 'Longitudinal', 'Twin-study',
  'Quality control', 'Population-based', 'Disease specific', ' Birth cohort', ' Other']);

function generateSampleCollection(){
  id ++;
  return {
    id: 'SC '+ id,
    acronym: 'Acronym ' + id,
    name: 'Name '+ id,
    description: 'Description '+id,
    collection_type: getRandomCollectionType(),
    contact_id: util.randomInteger(0,100)
  }
}

if(process.argv[3]){
  path = process.argv[3];
}

if(process.argv[2] && parseInt(process.argv[2])){
  size = parseInt(process.argv[2]);
}

var collections = _.range(size).map(function(o, i){
  var collection = generateSampleCollection();
  return _.values(collection).join(',');
});

fs.writeFile(path, collections.join('\n'), function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved!");
});
