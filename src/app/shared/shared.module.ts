import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { StylizeDirective } from './directives/stylize/stylize.directive';
import { OrderByPipe } from './pipes/order-by/order-by.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HighlightDirective,
    StylizeDirective,
    OrderByPipe,
    LoaderComponent,
  ],
  exports: [
    HighlightDirective,
    StylizeDirective,
    OrderByPipe,
    LoaderComponent,
    CommonModule,
    FormsModule
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class SharedModule { }
