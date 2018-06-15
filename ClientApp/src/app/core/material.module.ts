import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatPaginatorModule, MatSortModule, MatOptionModule, MatSelectModule  } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
        MatToolbarModule, MatPaginatorModule, MatSortModule, MatSelectModule, MatOptionModule ],
    exports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
        MatToolbarModule, MatPaginatorModule, MatSortModule,MatSelectModule, MatOptionModule ]
})
export class CustomMaterialModule { }
