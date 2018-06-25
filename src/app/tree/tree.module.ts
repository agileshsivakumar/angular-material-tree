import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatButtonModule,
  MatIconModule,
  MatProgressBarModule,
  MatTreeModule
} from '@angular/material';
import { AngularMaterialTreeComponent } from './angular-material-tree/angular-material-tree.component';

@NgModule({
  imports: [
    CommonModule,
    MatTreeModule,
    MatIconModule,
    MatProgressBarModule,
    MatButtonModule
  ],
  declarations: [AngularMaterialTreeComponent],
  exports: [AngularMaterialTreeComponent]
})
export class TreeModule {}
