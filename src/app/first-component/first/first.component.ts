import { Component, Inject, OnInit, Optional, Self } from '@angular/core';
import { GeneratorService } from '../../core/services/generator-service/generator';
import { generatedString, GeneratorFactory } from '../../core/services/generator-factory/generator.factory';
import { appConst, constantsInstance } from '../../core/services/constants-service/constants.service';
import { ConfigOptionsService } from '../../core/services/config-options/config-options.service';
import {
  localStorage,
  localStorageInstance,
  LocalStorageService
} from '../../core/services/local-storage/local-storage.service';

@Component({
  selector: 'app-first',
  templateUrl: './first.component.html',
  styleUrls: ['./first.component.scss'],
  providers: [
    {provide: appConst, useValue: constantsInstance.appConstants},
    GeneratorService,
    {provide: generatedString, useFactory: GeneratorFactory(20), deps: [GeneratorService]},
    {provide: localStorage, useValue: localStorageInstance},
  ],
})
export class FirstComponent implements OnInit {

  constructor(
    @Optional() config: ConfigOptionsService,
    @Optional() @Inject(appConst) private appConst: object,
    @Inject(generatedString) private generatedString: string,
    @Optional() @Self() private genService: GeneratorService,
    @Inject(localStorage) private localStorage: LocalStorageService,
  ) {
  }

  ngOnInit(): void {
    console.log('Constant: ', this.appConst);
    console.log('Generated string: ', this.generatedString);
    console.log('Generated ID: ', this.genService?.getNewId());
    this.localStorage.setItem('device', 'Phone');
  }
}
