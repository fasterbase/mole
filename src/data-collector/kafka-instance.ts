import { Consumer, Kafka, Producer } from "kafkajs";
import * as config from "../assets/config.json";

export class KafkaInstance {
    private kafka: Kafka;
    public producer: Producer;
    public consumer: Consumer;

    constructor() {
        this.kafka = new Kafka({
            clientId: config.kafka.clientId,
            brokers: [config.kafka.host],
        });
        console.log("Kafka instance initialized");
    }

    async connectProducer() {
        this.producer = this.kafka.producer();
        await this.producer.connect();
        console.log("Kafka producer connected");
    }

    async connectConsumer(){
        this.consumer = this.kafka.consumer({ groupId: config.kafka.groupId });
        console.log("Kafka consumer connected");
    }

    async send(topic: string, message: string) {
        if (this.producer){
            await this.producer.send({
                topic,
                messages: [{ value: message }],
            });
        } else {
            console.log("Kafka producer ain't initiated yet.");
        }
    }

    async subscribe(topic: string) {
        if(this.consumer){
            await this.consumer.subscribe({
                topic,
                fromBeginning: true
            });
        } else {
            console.log("Kafka consumer ain't initiated yet.");
        }
    }
}
