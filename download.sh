# Export java home
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_40.jdk/Contents/Home/

# Download function
Download () {
  URL="$1"
  FILENAME="tools/$(basename $URL)"

  if [ -f $FILENAME ]; then
    echo "File '$FILENAME' Exists"
  else
    wget $URL -P tools
  fi
}

# Download Tools
DownloadTools() {

  # Download ES
  Download https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.0.0.zip
  # Download logstash
  Download https://artifacts.elastic.co/downloads/logstash/logstash-5.0.0.zip
  # Download filebeat
  Download https://artifacts.elastic.co/downloads/beats/filebeat/filebeat-5.0.0-darwin-x86_64.tar.gz

  # Download derby
  Download http://ftp.fau.de/apache//db/derby/db-derby-10.13.1.1/db-derby-10.13.1.1-bin.zip
}

Unzip() {

  echo "Unzipping files"

  # Unzip
  unzip -o -q tools/elasticsearch-5.0.0.zip -d tools
  unzip -o -q tools/logstash-5.0.0.zip -d tools
  unzip -o -q tools/db-derby-10.13.1.1-bin.zip -d tools
  tar -jxf tools/filebeat-5.0.0-darwin-x86_64.tar.gz --directory tools

}

ConfigLogstash () {

  # Install logstash plugins
  ./tools/logstash-5.0.0/bin/logstash-plugin install logstash-input-jdbc
  ./tools/logstash-5.0.0/bin/logstash-plugin install logstash-output-jdbc

}

CreateDB () {

  # Delete database folder
  rm -r -f derbyDB
  # Create database
  ./tools/db-derby-10.13.1.1-bin/bin/ij ./config/db/db-schema.sql

}

DownloadTools
Unzip
ConfigLogstash
CreateDB

# Useful commands
#./tools/logstash-5.0.0/bin/logstash -f ./config/logstash.db.jmv.conf
#./filebeat-1.3.1-darwin/filebeat -c ./data/config/
