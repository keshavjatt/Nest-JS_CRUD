import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { SubTask } from './sub-task.entity';  
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Todo, SubTask])],
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}