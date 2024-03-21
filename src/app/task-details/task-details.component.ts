import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../Task.interface';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../task.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [DatePipe, MatButtonModule, MatIconModule, MatSnackBarModule],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.scss',
})
export class TaskDetailsComponent {
  @Input()
  task!: Task;

  @Output()
  taskDeleted: EventEmitter<string> = new EventEmitter();

  constructor(
    private taskService: TaskService,
    private snackBar: MatSnackBar
  ) {}

  markAsDone() {
    this.taskService
      .updateTask(this.task.id || '', {
        ...this.task,
        status: 'DONE',
      })
      .subscribe((res) => (this.task = res));
  }

  deleteTask() {
    this.taskService.deleteTask(this.task.id || '').subscribe({
      next: () => {
        this.taskDeleted.emit(this.task.id);
      },
      error: (err) => {
        this.snackBar.open('Something went wrong');
        console.log(err);
      },
    });
  }
}
