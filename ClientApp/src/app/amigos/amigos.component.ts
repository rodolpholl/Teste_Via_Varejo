import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { MatSort, MatPaginator, MatDialog } from '@angular/material';
import { AmigoService } from './amigos.service';
import { AmigoModel } from '../models/amigo';
import { BehaviorSubject } from 'rxjs';
import { DataSource } from '@angular/cdk/table';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { HttpClient } from '@angular/common/http';
import { AddAmigoComponent } from './dialogs/add-amigo/add-amigo.component';
import { EditAmigoComponent } from './dialogs/edit-amigo/edit-amigo.component';
import { DeleteAmigoComponent } from './dialogs/delete-amigo/delete-amigo.component';

@Component({
  selector: 'app-amigos',
  templateUrl: './amigos.component.html',
  styleUrls: ['./amigos.component.css']
})
export class AmigosComponent implements OnInit {

  constructor(private amigoService: AmigoService,
    public httpClient: HttpClient,
    public dialog: MatDialog) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('filter') filter: ElementRef;


  displayedColumns = ['Nome', 'Latitude', 'Longitude', 'actions'];
  amigoDatabase: AmigoService | null;
  dataSource: AmigoDataSource | null;
  index: number;
  id: number;

  ngOnInit() {
    this.loadData();
  }

  refresh() {
    this.loadData();
  }


  addNew(amigo: AmigoModel) {
    const dialogRef = this.dialog.open(AddAmigoComponent, {
      data: { amigo: amigo }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.amigoDatabase.dataChange.value.push(this.amigoService.getDialogData());
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, nome: string, latitude: string, longitude: string) {
    this.id = id;
    // index row is used just for debugging proposes and can be removed
    this.index = i;

    const dialogRef = this.dialog.open(EditAmigoComponent, {
      data: { id: id, nome: nome, latitude: latitude, longitude: longitude }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
       
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.amigoDatabase.dataChange.value.findIndex(x => x.id === this.id);
        console.log(foundIndex);
        // Then you update that record using data from dialogData (values you enetered)
        this.amigoDatabase.dataChange.value[foundIndex] = this.amigoDatabase.getDialogData();
        
        // And lastly refresh table
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, nome: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialog.open(DeleteAmigoComponent, {
      data: { id: id, nome: nome}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 1) {
        const foundIndex = this.amigoDatabase.dataChange.value.findIndex(x => x.id === this.id);
        // for delete we use splice in order to remove single object from DataService
        this.amigoDatabase.dataChange.value.splice(foundIndex, 1);
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
    this.amigoDatabase = new AmigoService(this.httpClient);
    this.dataSource = new AmigoDataSource(this.amigoDatabase, this.paginator, this.sort);
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

export class AmigoDataSource extends DataSource<AmigoModel>{

  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: AmigoModel[] = [];
  renderedData: AmigoModel[] = [];

  constructor(public _amigoDatabase: AmigoService,
    public _paginator: MatPaginator,
    public _sort: MatSort) {
    super();
    // Reset to the first page when the user changes the filter.
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<AmigoModel[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this._amigoDatabase.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this._amigoDatabase.getAmigosList();

    return Observable.merge(...displayDataChanges).map(() => {

      // Filter data
      this.filteredData = this._amigoDatabase.data.slice().filter((amigo: AmigoModel) => {
        const searchStr = (amigo.id.toString() + amigo.nome + amigo.latitude + amigo.longitude).toLowerCase();
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
  sortData(data: AmigoModel[]): AmigoModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';

      switch (this._sort.active) {
        case 'id': [propertyA, propertyB] = [a.id, b.id]; break;
        case 'nome': [propertyA, propertyB] = [a.nome, b.nome]; break;
        case 'latitude': [propertyA, propertyB] = [a.latitude, b.latitude]; break;
        case 'longitude': [propertyA, propertyB] = [a.longitude, b.longitude]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}
