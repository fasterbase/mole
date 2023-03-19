import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tableData")
export class TableData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    tableId: string; //uuid coming from Cheetah
}
