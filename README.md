### create a new topic
./kafka-topics.sh --create --bootstrap-server localhost:9092 --replication-factor 1 --partitions 1 --topic device-raw-data

### mosquitto publisher
mosquitto_pub -h localhost -t USERID-output -m "test message"

### mosquitto subscriber
mosquitto_sub -h localhost -t USERID-option