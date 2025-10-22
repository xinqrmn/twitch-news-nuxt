import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('parser-execs')
export class ParserExecutions {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: 'varchar' })
  caller: string

  @Column({ type: 'real' })
  execTime: number

  @CreateDateColumn({ type: 'timestamp with time zone' })
  dateTime: Date
}
