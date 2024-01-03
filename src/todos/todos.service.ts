import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Todo } from "./todo.entity";
import { SubTask } from "./sub-task.entity";
import { Repository } from "typeorm";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { CreateSubtaskDto } from "./dtos/create-subtask.dto";

@Injectable()
export class TodosService {
    constructor(
        @InjectRepository(Todo) private readonly todoRepository: Repository<Todo>,
        @InjectRepository(SubTask) private readonly subTaskRepository: Repository<SubTask>
    ) {}

    async create(dto: CreateTodoDto) {
        const todo = this.todoRepository.create(dto);
        const savedTodo = await this.todoRepository.save(todo);

        // adding default subtask for todo
        const subTask = new SubTask();
        subTask.title = "Default SubTask";
        subTask.todo = savedTodo;
        await this.subTaskRepository.save(subTask);

        return savedTodo;
    }

    findMany() {
        return this.todoRepository.find();
    }

    async update(id: number, dto: CreateTodoDto) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        Object.assign(todo, dto);

        return await this.todoRepository.save(todo);
    }

    async delete(id: number) {
        const todo = await this.todoRepository.findOne({ where: { id } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${id} not found`);
        }

        return await this.todoRepository.remove(todo);
    }

    async createSubtask(todoId: number, dto: CreateSubtaskDto) {
        const todo = await this.todoRepository.findOne({ where: { id: todoId } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${todoId} not found`);
        }
    
        const subTaskArrayOrSingle = this.subTaskRepository.create(dto);
    
        const subTasks = Array.isArray(subTaskArrayOrSingle) ? subTaskArrayOrSingle : [subTaskArrayOrSingle];
    
        for (const subTask of subTasks) {
            subTask.todo = todo;
            await this.subTaskRepository.save(subTask);
        }
    
        return subTasks;
    }

    async findSubtasks(todoId: number) {
        const todo = await this.todoRepository.findOne({ where: { id: todoId } });
        if (!todo) {
            throw new NotFoundException(`Todo with ID ${todoId} not found`);
        }

        return todo.subTasks;
    }
}