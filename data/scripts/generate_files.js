var faker = require('faker');
var fs = require('fs');
var _ = require('underscore');
var util = require('./util.js');

var getRandomCollectionType = util.randomValue(
  ['Case-control', 'Cohort', 'Cross-sectional', 'Longitudinal', 'Twin-study',
  'Quality control', 'Population-based', 'Disease specific',
  ' Birth cohort', ' Other']);

var getRandomMaterialType = util.randomValue(
    ['Blood', 'DNA', 'Faeces', 'Immortalized Cell Lines', 'Isolated Pathogen',
    'Other', 'Plasma', 'RNA', 'Saliva', 'Serum', 'Tissue (Frozen)',
    'Tissue (FFPE)', 'Urine']);

var getSex = util.randomValue(['Male', 'Female', 'Unknown', 'Undifferentiated']);

function generateContact(id){
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    zip: faker.address.zipCode(),
    country: faker.address.country(),
    id: id
  }
}

function generateSampleCollection(id, contact_id){
  return {
    id: id,
    acronym: 'Acronym ' + id,
    name: 'Name '+ id,
    description: 'Description '+id,
    collection_type: getRandomCollectionType(),
    contact_id: contact_id
  }
}

function generateSample(id, sample_collection_id){
  var mt = getRandomMaterialType();
  return {
    id: id,
    material_type: mt,
    material_type_detailed: 'Material type '+ mt,
    anatomical_site_id: 'as ' + id,
    anatomical_site_term: 'Anatomical Site term ' + id,
    anatomical_site_description: 'Anatomical Site desc ' + id,
    year_of_sampling: 2016,
    sample_collection_id: sample_collection_id,
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

function save(path, text){
  fs.writeFile(path, text, function(err) {
    if(err) {
      return console.log(err);
    }
    console.log("File saved in " + path);
  });
}

var size = 100,
    path = './';

if(process.argv[3]){
  path = process.argv[3];
}

if(process.argv[2] && parseInt(process.argv[2])){
  size = parseInt(process.argv[2]);
}

var number_sc = util.randomInteger(1, size),
    number_ci = util.randomInteger(1, size);

console.log('Generating:\n\t' + size + '\tsamples\n\t'+number_sc+'\tsample_collections\n\t'+number_ci+'\tcontact_information\n');

var samples = _.range(size).map(function(o, i){
    var sample = generateSample('S_' + (i+1), 'SC_' + util.randomInteger(1, number_sc) );
    return _.values(sample).join(',');
});

save(path + 'sample.csv', samples.join('\n'));

var contact_information = _.range(number_ci).map(function(o, i){
    var ci = generateContact('CI_' + (i+1));
    return _.values(ci).join(',');
});

save(path + 'contact_information.csv', contact_information.join('\n'));

var sample_collections = _.range(number_sc).map(function(o, i){
    var sc = generateSampleCollection('SC_' + (i+1), 'CI_' + util.randomInteger(1, number_ci))
    return _.values(sc).join(',');
});

save(path + 'sample_collection.csv', sample_collections.join('\n'));
