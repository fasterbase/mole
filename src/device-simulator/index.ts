import * as config from "../assets/config.json";
import * as mqtt from "mqtt";
import { IClientOptions } from "mqtt";

const publishTemperatureData = async (deviceSimulator: mqtt.MqttClient) => {
		for (let i = 0; i < 100; i++) {
				const message = JSON.stringify({
						deviceId: config.mqtt.topic.deviceId,
						temperature: Math.floor(Math.random() * 100),
						humidity: Math.floor(Math.random() * 100),
						timestamp: new Date().toISOString(),
				});

				deviceSimulator.publish(
						config.mqtt.topic.deviceId + config.mqtt.topic.suffix,
						message
				);
				console.log("Published message", message, config.mqtt.topic.deviceId + config.mqtt.topic.suffix);
				await new Promise((resolve) =>
						setTimeout(resolve, Math.random() * 6000 + 300)
				);
		}
};

const run = async () => {

		const option: IClientOptions = {
				host: config.mqtt.host,
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

		const deviceSimulator = mqtt.connect(option);

		deviceSimulator.on("connect", () => {
				console.log("deviceSimulator Connected to MQTT broker");
		});

		deviceSimulator.on("error", (err) => {
				console.log("deviceSimulator Error in MQTT broker", err);
		});

		await publishTemperatureData(deviceSimulator);
};

run().catch(console.error);
