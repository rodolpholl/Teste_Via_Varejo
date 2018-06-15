import {NgModule} from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
    MatToolbarModule, MatPaginatorModule, MatSortModule  } from '@angular/material';

@NgModule({
    imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
        MatToolbarModule, MatPaginatorModule, MatSortModule ],
    exports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatInputModule, MatTableModule,
        MatToolbarModule, MatPaginatorModule, MatSortModule ]
})
export class CustomMaterialModule { }
