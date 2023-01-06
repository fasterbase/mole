import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("DeviceData")
export class DeviceData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  deviceName: string;

  @Column()
  deviceId: string;

  @Column()
  key: string;

  @Column()
  segmentId: number;

  @Column()
  data: number;

  @CreateDateColumn()
  receivedAt: Date;
}
