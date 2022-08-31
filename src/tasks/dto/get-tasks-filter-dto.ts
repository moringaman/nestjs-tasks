import { TaskStatus } from '../taskStatusEnum';
import { IsIn, IsOptional, IsNotEmpty } from 'class-validator';

export class GetTasksFilterDto {
  @IsOptional() 
  @IsNotEmpty()
  search: string;
  @IsOptional()
  @IsIn([TaskStatus.DONE, TaskStatus.OPEN, TaskStatus.IN_PROGRESS])
  status: TaskStatus;
}
