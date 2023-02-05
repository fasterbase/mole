import { Brackets, MoreThan } from "typeorm";
import Redis from "ioredis";
import client, { Channel, Connection, ConsumeMessage } from "amqplib";

import * as config from "./assets/config.json";

import { deviceRepository, connect } from "./orm/connection";
import { UserValueMessage } from "./types/rabbit-message.type";

const redis = new Redis();

const initialRabbitMQ = async () => {
  const connection: Connection = await client.connect(
    `amqp://${config.rabbit.username}:${config.rabbit.password}@localhost:5672`
  );
  const channel: Channel = await connection.createChannel();
  await channel.assertQueue(config.rabbit.userValueQueue);

  const consumer =
    (channel: Channel) =>
    async (msg: ConsumeMessage | null): Promise<void> => {
      if (msg) {
        const decodedMessage = JSON.parse(msg.content.toString());
        switch (decodedMessage.type) {
          case "userValue": {
            const data: UserValueMessage = decodedMessage;
            await redis.set(`${data.userId}:userValue`, data.value);
            break;
          }
        }
        console.log("Message From MQ", decodedMessage);
        channel.ack(msg);
      }
    };

  await channel.consume(config.rabbit.userValueQueue, consumer(channel));
  //channel.sendToQueue("user-values", Buffer.from("message"));
};

const run = async () => {
  await connect();
  const now = new Date();

  await initialRabbitMQ();

  for (let pull of config.pulls) {
    setInterval(async () => {
      now.setDate(now.getSeconds() - pull.interval);
      if (deviceRepository) {
        const data = await deviceRepository
          .createQueryBuilder("DeviceData")
          .select("avg(data)", "avg")
          .where({
            key: pull.key,
            segmentId: pull.segmentId,
            receivedAt: MoreThan(now.toISOString()),
          })
          .getRawOne();
        if (data.avg) {
          await redis.set(`${pull.key}:${pull.interval}`, parseInt(data.avg));
        }
      }
    }, config.pullUpdateInterval);
  }
};

run().catch(console.error);
