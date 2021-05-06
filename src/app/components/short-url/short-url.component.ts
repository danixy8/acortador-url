import { Component, OnInit } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { ShortUrlService } from '../../services/short-url.service';

@Component({
  selector: 'app-short-url',
  templateUrl: './short-url.component.html',
  styleUrls: ['./short-url.component.css']
})
export class ShortUrlComponent implements OnInit {
  nombreUrl: string;
  urlShort: string;
  urlProcesada: boolean;
  loading: boolean;
  mostrarError: boolean;
  textError: string;
  botonCopiar: string;
  botonDesactived: boolean;

  constructor(private shortUrlService: ShortUrlService, private clipboardService: ClipboardService ) {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
    this.botonCopiar = 'copiar';
    this.botonDesactived = false;
  }

  ngOnInit(): void {
  }

  procesarUrl(): void {

    // validar si la url es vacia
    if (this.nombreUrl === ''){
      this.error('Por favor ingrese una url');
      return;
    }

    this.urlProcesada = false;
    this.loading = true;

    this.shortUrlService.getUrlShort(this.nombreUrl).subscribe(data => {
      this.urlProcesada = true;
      this.urlShort = data.link;
      this.loading = false;
      this.botonCopiar = 'copiar';
      this.botonDesactived = false;
    }, error => {
      this.loading = false;
      if (error.error.description === 'The value provided is invalid.'){
        this.error('la url proporcionado es invalida.');
      }
    });

  }

  error(valor: string): void {
    this.mostrarError = true;
    this.textError = valor;

    setTimeout(() => {
      this.mostrarError = false;
      this.nombreUrl = '';
      this.urlShort = '';
      this.urlProcesada = false;
    }, 4000);

  }

  copyContent(): void {
    this.clipboardService.copyFromContent(this.urlShort);
    this.botonCopiar = 'copiado';
    this.botonDesactived = true;
  }

  cleanForm(): void {
    this.nombreUrl = '';
    this.urlShort = '';
    this.urlProcesada = false;
    this.loading = false;
    this.mostrarError = false;
    this.textError = '';
    this.botonCopiar = 'copiar';
    this.botonDesactived = false;
  }

}

