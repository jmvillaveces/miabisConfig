# Generate all sample files
Generate () {

  node contact_information.js $1 ../generated/contact_information.csv
  node sample_collection.js $1 ../generated/sample_collection.csv
  node sample.js $1 ../generated/sample.csv

}

Generate $1
