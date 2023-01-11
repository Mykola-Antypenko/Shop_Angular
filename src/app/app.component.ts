import {
  AfterViewChecked,
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, AfterViewChecked {
  @ViewChild('appTitle')
  title!: ElementRef<HTMLTitleElement>;

  ngAfterViewInit(): void {
    this.title.nativeElement.innerHTML = 'Buy new phones';
  }

  ngAfterViewChecked(): void {
    console.log(this.title.nativeElement.innerHTML);
  }
}

