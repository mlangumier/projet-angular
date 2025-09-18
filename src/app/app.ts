import { DATE_PIPE_DEFAULT_OPTIONS, registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Component, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from './core/layout/footer/footer';
import { Header } from './core/layout/header/header';

registerLocaleData(localeFr);

@Component({
  selector: 'app-root',
  imports: [ RouterOutlet, Header, Footer ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  providers: [ { provide: LOCALE_ID, useValue: "fr" }, {
    provide: DATE_PIPE_DEFAULT_OPTIONS,
    useValue: { dateFormat: "longDate" }
  } ]
})
export class App {
}
