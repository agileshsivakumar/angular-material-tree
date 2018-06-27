import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTreeModule } from '@angular/cdk/tree';
import { TreeComponent } from './tree/tree.component';

@NgModule({
  imports: [CommonModule, CdkTreeModule],
  declarations: [TreeComponent],
  exports: [TreeComponent]
})
export class TreeModule {}
