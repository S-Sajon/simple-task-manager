import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { provideNativeDateAdapter } from '@angular/material/core';
import { TaskService } from '../task.service';
import { Task } from '../Task.interface';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    JsonPipe,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonToggleModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class AddTaskComponent {
  categoriesOfTask = ['Exercise', 'Study'];

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private router: Router
  ) {}
  taskForm = this.formBuilder.group({
    name: '',
    description: '',
    category: '',
    date: '',
    priority: '',
  });

  addTask() {
    this.taskService.addTask(this.taskForm.value as Task).subscribe((res) => {
      this.router.navigateByUrl('/');
    });
  }
}
