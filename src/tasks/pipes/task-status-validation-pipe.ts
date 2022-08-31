 import { PipeTransform, BadRequestException} from '@nestjs/common'
 import { TaskStatus } from '../taskStatusEnum'

 export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE,
    ]
    transform(value: any) {
        console.log('value', value)
        if (!this.statusIsValid(value)) {
            throw new BadRequestException(`${value} is an invalid status`)
        }
        return value
    }

    private statusIsValid(status):boolean {
        const idx = this.allowedStatuses.indexOf(status)
        return idx !== -1
    }
 }