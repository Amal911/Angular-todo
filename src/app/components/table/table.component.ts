import { SelectionModel } from '@angular/cdk/collections';
import { Component, Input } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TodoComponent } from '../../pages/todo/todo.component';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgClass } from '@angular/common';

export interface ToDoDataType {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    NgClass
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent {
  // toDoData:any=this.api.getToDoData().subscribe(res=>res);
  // ngOnInit(){
  //   console.log(this.toDoData);

  //   console.log(this.api.getToDoData().subscribe((res)=>{return res}));

  // }
  dataSource: any;
  selection: any;
  constructor(private api: ApiService) {
    let toDoData: ToDoDataType[] = [];
    this.api.getToDoData().subscribe((res) => {
      toDoData = res;
      // console.log(typeof res);

      console.log(res);
      this.dataSource = new MatTableDataSource<ToDoDataType>(toDoData);
      this.selection = new SelectionModel<ToDoDataType>(true, toDoData.filter((todo)=>todo.completed));
    });
  }
  displayedColumns: string[] = [
    'select',
    'position',
    'title',
    'edit',
    'delete',
  ];

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  // checkboxLabel(row?: ToDoDataType): string {
  //   if (!row) {
  //     return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
  //   }
  //   return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
  //     row.position + 1
  //   }`;
  // }
}
