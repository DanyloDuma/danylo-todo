import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  /* meuBoolean=false;
  atualizaBoorlean(valor: boolean){
    this.meuBoolean=valor;
  } */

  submit(){
    alert("Clicou no botão!");
  }

}
