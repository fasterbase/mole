// import { Kafka, Producer } from "kafkajs";
// import * as config from "./assets/config.json";
// import * as mqtt from "mqtt";
// import * as fs from "fs";
// import { IClientOptions } from "mqtt";
// import * as tls from "tls";

// import Server from "aedes";

// let kafkaProducer: Producer | null = null;

// const run = async () => {
//   await initializeKafka();
//   // await initializeMockMQTT();
//   await initializeMQTT();
//   // await initializeAedes();
// };

// const initializeMockMQTT = async () => {

//   for (let i = 0; i < 100; i++) {
// 		const message = JSON.stringify({
//       deviceId: config.mqtt.deviceId,
//       temperature: Math.floor(Math.random() * 100),
//       humidity: Math.floor(Math.random() * 100),
//       timestamp: new Date().toISOString(),
//     });

//     pushToKafka({ topic: "deviceData", data: message })
//     await new Promise(resolve => setTimeout(resolve, Math.random() * 5000 + 500))

//   }

// }

// const initializeAedes = async () => {
//   const options = {
//     // key: fs.readFileSync("./assets/key.pem"),
//     // cert: fs.readFileSync("./assets/cert.pem"),
//   };

//   const broker = new Server();
//   // @ts-ignore
//   const server = tls.createServer(options, broker.handle as unknown as any);
//   server.listen(config.mqtt.port, function () {
//     console.log("server started and listening on port ", config.mqtt.port);
//   });
// };

// const initializeMQTT = async () => {
//   const option: IClientOptions = {
//     host: "localhost",
//     port: parseInt(config.mqtt.port),
//     keepalive: 10,
//     protocol: "mqtt",
//     protocolId: "MQTT",
//     clientId: config.mqtt.deviceId,
//     protocolVersion: 4,
//     reconnectPeriod: 2000,
//     connectTimeout: 2000,
//     rejectUnauthorized: false,
//   };
//   const mqttClient = mqtt.connect(option); // create a client

//   mqttClient.on("error", function (err) {
//     console.error(err);
//   });

//   mqttClient.on("connect", function () {
//     console.log("mqttClient connected");

//     mqttClient.subscribe(config.mqtt.deviceId + "-output", function (err) {
//       if (!err) {
//         mqttClient.on("message", function (topic, message) {
//           try {
//             console.log("MQTT Data Received: " + message.toString());
//             pushToKafka({ topic: "history", data: message.toString() });
//             //pushToKafka({ topic: "deviceData", data: message.toString() });
//             //flow.run(JSON.parse(message.toString()));
//           } catch (e) {
//             console.error(e);
//           }
//           // client.end();
//         });
//       }
//     });
//   });
// };

// const initializeKafka = async () => {
//   console.log("initializing Kafka ...");
//   const kafka = new Kafka({
//     clientId: config.kafka.clientId,
//     brokers: [config.kafka.host],
//   });

//   kafkaProducer = kafka.producer();
//   await kafkaProducer.connect();

//   console.log("Kafka connected");
// };

// const pushToKafka = async (options: {
//   topic: keyof typeof config.kafka.topics;
//   data: string;
// }) => {
//   console.log("Push to Kafka", options);
//   const { topic, data } = options;

//   if (kafkaProducer) {
//     await kafkaProducer.send({
//       topic,
//       messages: [{ value: data }],
//     });
//   }
// };

// run().catch(console.error);
