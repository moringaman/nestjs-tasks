import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TaskStatus } from './taskStatusEnum';
import { Task } from './task.entity';
import { User } from '../auth/user.entity'
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';
import { createTask, getTasks } from './operations'

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private taskRepository: Repository<Task>,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]>{

   const result = await getTasks(filterDto, this.taskRepository, user)
   return result
   
  }

  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.taskRepository.findOne({
      where: {
        id: id,
        userId: user.id
      },
    });

    if (!found) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
    return found;
  }

  async deleteTaskById(id: number): Promise<void> {
  
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`Task with Id ${id} not found`);
    }
  }

 async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await task.save()
    return task
 }


  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const task = await createTask(createTaskDto, user)
    return task;
  }
}
