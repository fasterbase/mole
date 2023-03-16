import { Kafka, Producer } from "kafkajs";
import * as config from "./assets/config.json";

export class KafkaProducer {
    private kafka: Kafka;
    private producer: Producer;

    constructor() {
        console.log("Initializing KafkaProducer");
        this.kafka = new Kafka({
            clientId: config.kafka.clientId,
            brokers: [config.kafka.host],
        });
    }

    async connect() {
        this.producer = this.kafka.producer();
        await this.producer.connect();
        console.log("KafkaProducer connected");
    }

    async send(topic: string, message: string) {
        await this.producer.send({
            topic,
            messages: [{ value: message }],
        });
    }
}
