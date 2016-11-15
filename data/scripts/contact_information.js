var faker = require('faker');
var fs = require('fs');
var _ = require('underscore');

var size = 100,
    path = 'contact_information.csv';

function generateContact(){
  return {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    address: faker.address.streetAddress(),
    zip: faker.address.zipCode(),
    country: faker.address.country()
  }
}

if(process.argv[3]){
  path = process.argv[3];
}

if(process.argv[2] && parseInt(process.argv[2])){

  var contacts = _.range(parseInt(process.argv[2])).map(function(o, i){
    var contact = generateContact();
    contact.id = i;
    return _.values(contact).join(',');
  });

  fs.writeFile(path, contacts.join('\n'), function(err) {
      if(err) {
          return console.log(err);
      }
      console.log("The file was saved!");
  });
}
