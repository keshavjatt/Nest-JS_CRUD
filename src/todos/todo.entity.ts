import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SubTask } from './sub-task.entity';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => SubTask, subTask => subTask.todo)
  subTasks: SubTask[];
}