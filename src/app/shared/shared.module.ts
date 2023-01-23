import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { StylizeDirective } from './directives/stylize/stylize.directive';

@NgModule({
  declarations: [
    HighlightDirective,
    StylizeDirective
  ],
    exports: [
        HighlightDirective,
        StylizeDirective
    ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
