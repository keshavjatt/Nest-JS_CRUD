import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { TodosService } from "./todos.service";
import { CreateTodoDto } from "./dtos/create-todo.dto";
import { CreateSubtaskDto } from "./dtos/create-subtask.dto";

@Controller('todos')
export class TodosController {
    constructor(private readonly todoService: TodosService) {}
    @Post()
    create(@Body() dto: CreateTodoDto) {
        return this.todoService.create(dto);
    }

    @Get()
    findMany() {
        return this.todoService.findMany();
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() dto: CreateTodoDto) {
        return this.todoService.update(id, dto);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.todoService.delete(id);
    }

    // For creating a subtask
    @Post(':id/subtasks')
    createSubtask(@Param('id') id: number, @Body() dto: CreateSubtaskDto) {
        return this.todoService.createSubtask(id, dto);
    }

    // For get subtasks relation with todo table
    @Get(':id/subtasks')
    findSubtasks(@Param('id') id: number) {
        return this.todoService.findSubtasks(id);
    }
}