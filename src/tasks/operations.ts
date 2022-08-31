
import { TaskStatus } from './taskStatusEnum';
import { Task } from './task.entity';
import { User } from '../auth/user.entity'
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto'

export async function createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto
    console.log(user)
    const task = new Task()
    task.description = description
    task.title = title
    task.status = TaskStatus.OPEN
    task.user = user
    await task.save()
    delete task.user
    return task;
}

export async function getTasks(filterDto: GetTasksFilterDto, taskRepository, user: User): Promise<Task[]> {
  
    const { status, search } = filterDto
    const query = taskRepository.createQueryBuilder('task')
    
    query.where('task.userId = :userId', {userId: user.id})

    if(status) {
        query.andWhere('task.status = :status', { status })
    }

    if(search) {
        query.andWhere('(task.title LIKE :search OR task.description LIKE :search)', { search: `%${search}%` })
    }
    const tasks = await query.getMany()
    return tasks
}