import dotenv from "dotenv";
import * as path from "path";

const amqplib = require("amqplib");

import * as config from "../assets/config.json";
import { Keys, Message } from "./types/message.type";
import { workspaceHandler } from "./workspace-handler";

dotenv.config({ path: path.resolve(__dirname, "../.env") });

async function runConsumer() {
  const queue = config.user.companyId + "-from-cheetah-*";
  const conn = await amqplib.connect(process.env.RMQ_CONNECTION);

  const channel = await conn.createChannel();
  await channel.assertQueue(queue, { durable: true });
  await channel.prefetch(1);

  // Listener
  await channel.consume(
    queue,
    async (msg: any) => {
      if (msg !== null) {
        console.log("Received:", msg.content.toString());
        channel.ack(msg);
        await eventHandler(msg);
      } else {
        console.log("Consumer cancelled by server");
      }
    },
    { noAck: false }
  );
}

const eventHandler = async (message: Message) => {
  switch (message.key) {
    case Keys.Workspace:
      await workspaceHandler(message);
      break;
  }
};

runConsumer();
