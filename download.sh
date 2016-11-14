# Export java home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home/

# Remove tools folder
rm -r -f tools*
#rm -r -f logstash*
#rm -r -f filebeat*
#rm -r -f derby*
#rm -r -f db-*ls

# Download Tools

# Download ES
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.0.0.zip -P tools
# Download logstash
wget https://artifacts.elastic.co/downloads/logstash/logstash-5.0.0.zip -P tools
# Download filebeat
wget https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-5.0.0-darwin-x86_64.tar.gz -P tools

# Download derby
wget http://ftp.fau.de/apache//db/derby/db-derby-10.13.1.1/db-derby-10.13.1.1-bin.zip -P tools

# Unzip
unzip -q tools/elasticsearch-5.0.0.zip -d tools
unzip -q tools/logstash-5.0.0.zip -d tools
unzip -q tools/db-derby-10.13.1.1-bin.zip -d tools
tar -jxf tools/filebeat-5.0.0-darwin-x86_64.tar.gz --directory tools

# Install logstash plugins
./tools/logstash-5.0.0/bin/logstash-plugin install logstash-input-jdbc
./tools/logstash-5.0.0/bin/logstash-plugin install logstash-output-jdbc

# Create database
./tools/db-derby-10.13.1.1-bin/bin/ij ./config/db/db-schema.sql

# Useful commands
#./logstash/logstash-2.4.0/bin/logstash -f ./data/config/logstash.db.conf
#./filebeat-1.3.1-darwin/filebeat -c ./data/config/
