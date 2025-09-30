import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High'
}

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  task!: string;

  @Column({
    type: 'simple-enum',
    enum: Priority,
    default: Priority.MEDIUM
  })
  priority!: Priority;

  @Column({ type: 'date', nullable: true })
  deadline!: Date | null;

  @Column({ default: false })
  isDone!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}