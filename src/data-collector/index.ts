import * as config from "./assets/config.json";
import * as mqtt from "mqtt";
import { IClientOptions } from "mqtt";
import { KafkaProducer } from './kafka-producer';

let kafkaProducer: KafkaProducer | null = null;

const run = async () => {
	await initializeKafkaProducer();
	await initializeMQTT();
};

const initializeMQTT = async () => {
	const option: IClientOptions = {
	  host: "localhost",
	  port: parseInt(config.mqtt.port),
	  keepalive: 10,
	  protocol: "mqtt",
	  protocolId: "MQTT",
	  clientId: config.mqtt.topic.deviceId,
	  protocolVersion: 4,
	  reconnectPeriod: 2000,
	  connectTimeout: 2000,
	  rejectUnauthorized: false,
	};
	const mqttSubscriber = mqtt.connect(option);
  
	mqttSubscriber.on("error", function (err) {
	  console.error(err);
	});
  
	mqttSubscriber.on("connect", function () {
		console.log("MQTT Connected");

		mqttSubscriber.subscribe(config.mqtt.topic.deviceId + config.mqtt.topic.suffix, function (err) {
			console.log(err);
			console.log('subscriber', config.mqtt.topic.deviceId + config.mqtt.topic.suffix);
			if (!err) {
			  mqttSubscriber.on("message", function (topic, message) {
				try {
				  console.log("MQTT Data Received: " + message.toString());
				  pushToKafka({ topic: topic, data: message.toString() });
				} catch (e) {
				  console.error(e);
				}
			  });
			}
		  });

	});



  };

  const pushToKafka = async (options: {
	topic: string;
	data: string;
  }) => {
	if (kafkaProducer) {
	  await kafkaProducer.send(options.topic, options.data);
	}
  };

const initializeKafkaProducer = async () => {
	kafkaProducer = new KafkaProducer();
	await kafkaProducer.connect();
  };

run().catch(console.error);
