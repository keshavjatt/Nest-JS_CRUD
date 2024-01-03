import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Todo } from './todo.entity';

@Entity({ name: 'sub_tasks' })
export class SubTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @ManyToOne(() => Todo, todo => todo.subTasks)
  todo: Todo;
}