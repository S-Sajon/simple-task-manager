import { Component } from '@angular/core';
import { TaskDetailsComponent } from '../task-details/task-details.component';
import { TaskService } from '../task.service';
import { Task } from '../Task.interface';
import { take } from 'rxjs';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [TaskDetailsComponent],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
})
export class TaskListComponent {
  allTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.taskService.getAllTasks().pipe(take(1)).subscribe((res) => {
      this.allTasks = res;
      console.log(this.allTasks);
    });
  }

  deleteTask(id: string) {
    this.allTasks = this.allTasks.filter((task) => task.id !== id);
  }
}
