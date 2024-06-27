import { Component } from '@angular/core';
import { TableComponent } from '../../components/table/table.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})

export class TodoComponent {
  // toDoData:any = this.fetchData();
  constructor(public api:ApiService){}
  fetchData(){
    this.api.getToDoData().subscribe(res=>{
      console.log(res);
      // this.toDoData = res;
      // console.log(this.toDoData);
      return res;
    });
  }
}
