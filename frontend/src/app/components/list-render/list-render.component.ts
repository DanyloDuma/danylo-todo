import { Component } from '@angular/core';

import { Animal } from '../../Animal';

import { ListService } from '../../services/list.service';

@Component({
  selector: 'app-list-render',
  standalone: false,
  templateUrl: './list-render.component.html',
  styleUrl: './list-render.component.css'
})
export class ListRenderComponent {
  animals: Animal[] =[
    {name: "Turca", type: "dog", age: 4},
    {name: "Tom", type: "cat", age: 10},
    {name: "Frida", type: "dog", age: 5},
    {name: "Bob", type: "Horse", age: 1},
  ]

  animal: Animal={
    name: 'teste',
    type: 'alguma coisa',
    age: 10,
  }

  animalDetails=''

  constructor(private listService: ListService){}

  showAge(animal: Animal){
    this.animalDetails=`O pet ${animal.name} tem ${animal.age} anos`
  }

  removeAnimal(animal: Animal){
    alert("Removendo Animal...");
    this.animals=this.listService.remove(this.animals, animal);
  }
}
