import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

import {HttpClient} from '@angular/common/http';
import {MatDialog, MatPaginator, MatSort} from '@angular/material';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import { User } from '../models/User';
import { Observable } from 'rxjs/internal/Observable';
import { AddDialogUsersComponent } from './dialogs/add/add.dialog.users.component';
import { EditDialogUsersComponent } from './dialogs/edit/edit-dialog-users.component';
import { UserService } from './service/users.service';
import { DeleteDialogUsersComponent } from './dialogs/delete/delete-dialog.users.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  displayedColumns = ['id', 'title', 'state', 'url', 'created_at', 'updated_at', 'actions'];
  userDatabase: UserService | null;
  dataSource: UserDataSource | null;
  index: number;
  id: number;

  constructor(public httpClient: HttpClient,
    public dialog: MatDialog,
    public dataService: UserService) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
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


  addNew(user: User) {
    const dialogRef = this.dialog.open(AddDialogUsersComponent, {
      data: {user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.userDatabase.dataChange.value.push(this.dataService.getDialogData());
        this.refreshTable();
      }
    });
  }


  startEdit(i: number, id: number, nome: string, login: string, senha: string,ativo: boolean) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;
    console.log(this.index);
    const dialogRef = this.dialog.open(EditDialogUsersComponent, {
      data: {id: id, nome: nome, login: login, senha: senha, ativo: ativo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x.Id === this.id);
        // Then you update that record using data from dialogData (values you enetered)
        this.userDatabase.dataChange.value[foundIndex] = this.dataService.getDialogData();
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, nome: string, login: string, senha: string,ativo: boolean) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteDialogUsersComponent, {
      data: {id: id, nome: nome, login: login, senha: senha, ativo: ativo}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.userDatabase.dataChange.value.findIndex(x => x.Id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.userDatabase.dataChange.value.splice(foundIndex, 1);
        this.refreshTable();
      }
    });
  }


   // If you don't need a filter or a pagination this can be simplified, you just use code from else block
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

  

}


export class UserDataSource extends DataSource<User> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: User[] = [];
  renderedData: User[] = [];

  constructor(public _userDatabase: UserService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    // Atualiza a primeira página quanod o usuário selecionar o filtro.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Função Connect Chamada pela tabela para retornar uma sequencia de dados contida no reader  */
  connect(): Observable<User[]> {
    // Ouve qualquer mudança na base, sejam dados, ordenação, filtro e paginação
    const displayDataChanges = [
      this._userDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._userDatabase.getAllUsers();

    return Observable.merge(...displayDataChanges).map(() => {
      // Filtrando os dados
      this.filteredData = this._userDatabase.data.slice().filter((user: User) => {
        const searchStr = (user.Id + user.Nome + user.Ativo).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // ordenando osdados filtrados
      const sortedData = this.sortData(this.filteredData.slice());

      // Pega a divisão das páginas para filtrar os dados atualizaados
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    });
  }
  disconnect() {
  }

  /** Retorna uma cólia ordenada do dataset */
  sortData(data: User[]): User[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: boolean | number | string = '';
      let propertyB: boolean | number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.Id, b.Id]; break;
        case 'nome': [propertyA, propertyB] = [a.Nome, b.Nome]; break;
        case 'ativo': [propertyA, propertyB] = [a.Ativo, b.Ativo]; break;
        case 'senha': [propertyA, propertyB] = [a.Senha, b.Senha]; break;
        case 'login': [propertyA, propertyB] = [a.Login, b.Login]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
