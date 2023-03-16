import { Kafka } from "kafkajs";
import * as config from "./assets/config.json";
import { deviceRepository, connect } from "../orm/connection";
import { DeviceData } from "../orm/entities/device.entity";

const run = async (topic: keyof typeof config.kafka.topics) => {
  if (!topic) {
    throw new Error("Topic is empty");
  }
  await connect();

  const kafka = new Kafka({
    clientId: config.kafka.clientId,
    brokers: [config.kafka.host],
  });

  const consumer = kafka.consumer({ groupId: config.kafka.groupId });

  await consumer.subscribe({
    topic,
    fromBeginning: true,
  });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log("topic", topic, "partition", partition, "message", message);
      if (message.value) {
        if (deviceRepository === null) {
          throw new Error("deviceRepository is not loaded");
        }
        switch (topic) {
          case config.kafka.topics.deviceData: {
            //TODO WHAT SHOULD BE DO NOW?
            console.log(JSON.parse(message.value.toString()))
            break;
          }
          case config.kafka.topics.history: {
            const data: DeviceData = JSON.parse(message.value.toString());
            console.log("Write to dB", data);
            const deviceLog = deviceRepository.create({
              deviceName: data.deviceName,
              deviceId: data.deviceId,
              segmentId: data.segmentId,
              key: "keyTest",
              data: data.data,
            });
            await deviceRepository.save(deviceLog);
            break;
          }
          default: {
            console.error(`${topic} - topic not found`);
          }
        }
      }
    },
  });
};

const inputParameters = process.argv.slice(2);

run(inputParameters[0] as any).catch(console.error);
