import { Controller, Get, Post, Body, Param , Delete, Patch, Query, UsePipes, ValidationPipe, ParseIntPipe, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { TaskStatus } from './taskStatusEnum'
import { Task } from './task.entity'
import { User } from '../auth/user.entity'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { GetUser } from '../auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
    constructor(private tasksService: TasksService) {}
    @Get()
    getTasks(
        @GetUser() user: User,
        @Query(ValidationPipe)
        filterDto: GetTasksFilterDto
        ): Promise<Task[]>{
        return this.tasksService.getTasks(filterDto, user);
    }
    @Get('/:id')
     getTaskById(
        @GetUser() user: User,
        @Param('id', ParseIntPipe)
         id: number
         ): Promise <Task> {
        return this.tasksService.getTaskById(id, user);
    }

    @Delete('/:id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.tasksService.deleteTaskById(id);
    }

    @Patch('/:id/status')
    updateTaskStatus(
        @GetUser() user: User,
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidationPipe)status: TaskStatus
        ):Promise<Task>{
        return this.tasksService.updateTaskStatus(id, status, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    async createTask(
        @GetUser()user: User,
        @Body()createTaskDto: CreateTaskDto,
        ): Promise<Task> {
         console.log('user',  user);
        return this.tasksService.createTask(createTaskDto, user)
    }
}
