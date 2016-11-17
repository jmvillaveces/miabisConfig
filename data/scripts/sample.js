var faker = require('faker');
var fs = require('fs');
var _ = require('underscore');
var util = require('./util.js');

var size = 100,
    id = 0,
    path = 'sample.csv';

var getRandomMaterialType = util.randomValue(
  ['Blood', 'DNA', 'Faeces', 'Immortalized Cell Lines', 'Isolated Pathogen',
  'Other', 'Plasma', 'RNA', 'Saliva', 'Serum', 'Tissue (Frozen)',
  'Tissue (FFPE)', 'Urine']);

var getSex = util.randomValue(
    ['Male', 'Female', 'Unknown', 'Undifferentiated']);

function generateSample(){
  id ++;
  var mt = getRandomMaterialType();
  return {
    id: 'MT '+ id,
    material_type: mt,
    material_type_detailed: 'Material type '+ mt,
    anatomical_site_id: 'as ' + id,
    anatomical_site_term: 'Anatomical Site term ' + id,
    anatomical_site_description: 'Anatomical Site desc ' + id,
    year_of_sampling: 2016,
    sample_collection_id: util.randomInteger(0,100),
    biobank: 'Biobank ' + util.randomInteger(1,5),
    disease_id: 'ds ' + id,
    disease_term: 'Disease term ' + id,
    disease_description: 'Disease desc ' + id,
    year_of_birth: 1980,
    year_of_death: 2016,
    year_of_diagnosis: 2014,
    year_of_remission: 2015,
    proband: 'some proband' + id,
    mutation: 'some mutation' + id,
    registry_id: util.randomInteger(1,20),
    sex: getSex(),
    participant_id: util.randomInteger(1,20),
    last_updated: faker.date.recent(),
    upload_date: faker.date.recent()
  }
}

if(process.argv[3]){
  path = process.argv[3];
}

if(process.argv[2] && parseInt(process.argv[2])){
  size = parseInt(process.argv[2]);
}

var samples = _.range(size).map(function(o, i){
  var sample = generateSample();
  return _.values(sample).join(',');
});

fs.writeFile(path, samples.join('\n'), function(err) {
  if(err) {
    return console.log(err);
  }
  console.log("The file was saved in " + path);
});
