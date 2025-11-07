import { IsUrl, IsUUID } from "class-validator";
import { Column, Entity } from "typeorm";

@Entity('storage')
export class Storage {
  @IsUUID()
  @Column({ type: 'varchar', primary: true })
  uuid: string

  @Column({type: 'varchar'})
  name: string

  @Column({type: 'varchar'})
  @IsUrl()
  url: string
}