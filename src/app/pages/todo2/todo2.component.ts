import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ToDoDataType } from '../../components/table/table.component';
import { SelectionModel } from '@angular/cdk/collections';
import { Observable, map, } from 'rxjs';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-todo2',
  standalone: true,
  imports: [],
  templateUrl: './todo2.component.html',
  styleUrl: './todo2.component.scss'
})
export class Todo2Component {

  dataSource = new MatTableDataSource<ToDoDataType>([]);
  displayedColumns: string[] = [
    'select',
    'position',
    'title',
    'edit',
    'delete',
  ];
  selection = new SelectionModel<ToDoDataType>(true,[]);
  todoList$!:Observable<ToDoDataType[]>;
  isLoading:Boolean = true;
  score:any

  constructor(public api:ApiService){}

  ngOnInit():void{
    this.todoList$ = this.api.getToDoData2().pipe(
      map((todos)=>todos.filter(todo=>!todo.completed)),
      map((todos)=>todos.map(todo=>({...todo,"title":todo.title.toUpperCase()}))
    ));
    console.log(this.todoList$);
    

    this.todoList$.subscribe((res:ToDoDataType[])=>{
      this.dataSource.data=res;
      this.isLoading = false;
      res.forEach(item => {
        if(item.completed){
          this.selection.select(item);
        }
      });
      console.log(this.dataSource);
      
    })
  }
}
