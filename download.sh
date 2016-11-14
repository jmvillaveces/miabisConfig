# Export java home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home/

# Remove All folders
rm -r -f elasticsearch*
rm -r -f logstash*
rm -r -f filebeat*
rm -r -f derby*
rm -r -f db-*

# Download Tools

# Download ES
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.0.0.zip
# Download logstash
wget https://artifacts.elastic.co/downloads/logstash/logstash-5.0.0.zip
# Download filebeat
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-5.0.0-darwin-x86_64.tar.gz

# Download derby
wget http://ftp.fau.de/apache//db/derby/db-derby-10.13.1.1/db-derby-10.13.1.1-bin.zip

# Unzip
unzip elasticsearch-5.0.0.zip -d elasticsearch
unzip logstash-5.0.0.zip -d logstash
unzip db-derby-10.13.1.1-bin.zip -d derby
gunzip -c filebeat-5.0.0-darwin-x86_64.tar.gz | tar xopf -

# Install logstash plugins
./logstash/logstash-5.0.0/bin/logstash-plugin install logstash-input-jdbc
./logstash/logstash-5.0.0/bin/logstash-plugin install logstash-output-jdbc

# Create database
./derby/db-derby-10.13.1.1-bin/bin/ij ./db/db-schema.sql

# Useful commands
#./logstash/logstash-2.4.0/bin/logstash -f ./data/config/logstash.db.conf
#./filebeat-1.3.1-darwin/filebeat -c ./data/config/
