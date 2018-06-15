import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { UserService } from './users.service';
import { UserModel } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient } from '@angular/common/http';
import { AddUserComponent } from './dialog/add-user/add-user.component';
import { EditUserComponent } from './dialog/edit-user/edit-user.component';
import { DeleteUserComponent } from './dialog/delete-user/delete-user.component';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(private userService: UserService,
              public httpClient: HttpClient,
              public dialog: MatDialog) {  }


  displayedColumns = ['Nome','Login','Ativo', 'actions'];
  userDatabase: UserService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: number;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }


  addNew(user: UserModel) {
    const dialogRef = this.dialog.open(AddUserComponent, {
      data: {user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.userDatabase.dataChange.value.push(this.userService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, nome: string, login: string, senha: string, ativo: boolean){
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    const dialogRef = this.dialog.open(EditUserComponent, {
      data: {id: id, nome: nome, login: login, senha: senha, ativo: ativo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.userDatabase.dataChange.value[foundIndex] = this.userService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, nome: string, login:string){
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      data: {id: id, nome: nome, login: login}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        //this.userDatabase.dataChange.value.splice(foundIndex, 1);
        this.userDatabase.dataChange.value[foundIndex] = this.userService.getDialogData();
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    // if there's a paginator active we're using it for refresh
    if (this.dataSource._paginator.hasNextPage()) {
      this.dataSource._paginator.nextPage();
      this.dataSource._paginator.previousPage();
      // in case we're on last page this if will tick
    } else if (this.dataSource._paginator.hasPreviousPage()) {
      this.dataSource._paginator.previousPage();
      this.dataSource._paginator.nextPage();
      // in all other cases including active filter we do it like this
    } else {
      this.dataSource.filter = '';
      this.dataSource.filter = this.filter.nativeElement.value;
    }
  }

  public loadData() {
    this.userDatabase = new UserService(this.httpClient);
    this.dataSource = new UserDataSource(this.userDatabase, this.paginator, this.sort);
    Observable.fromEvent(this.filter.nativeElement, 'keyup')
      .debounceTime(150)
      .distinctUntilChanged()
      .subscribe(() => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      });
  }

}


export class UserDataSource extends DataSource<UserModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: UserModel[] = [];
  renderedData: UserModel[] = [];

  constructor(public _userDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<UserModel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._userDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._userDatabase.getUsersList();

    return Observable.merge(...displayDataChanges).map(() => {

      // Filter data
      this.filteredData = this._userDatabase.data.slice().filter((user: UserModel) => {
        const searchStr = (user.id.toString() + user.nome + user.login).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }



  /** Returns a sorted copy of the database data. */
  sortData(data: UserModel[]): UserModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string | boolean = '';
      let propertyB: number | string | boolean = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'nome': [propertyA, propertyB] = [a.nome, b.nome]; break;
        case 'login': [propertyA, propertyB] = [a.login, b.login]; break;
        case 'senha': [propertyA, propertyB] = [a.senha, b.senha]; break;
        case 'ativo': [propertyA, propertyB] = [a.ativo, b.ativo]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
