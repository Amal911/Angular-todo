import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToDoDataType } from '../components/table/table.component';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  getToDoData(){
    return this.http.get<ToDoDataType[]>('https://jsonplaceholder.typicode.com/todos');

  }
  getToDoData2():Observable<ToDoDataType[]>{
    return this.http.get<ToDoDataType[]>('https://jsonplaceholder.typicode.com/todos');
  }
}
