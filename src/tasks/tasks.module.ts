import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { DatabaseModule } from '../database.module';
import { taskProviders } from './tasks.providers'
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [...taskProviders, TasksService,]
})
export class TasksModule {}
