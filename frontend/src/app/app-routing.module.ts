import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ListRenderComponent } from './components/list-render/list-render.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'list', component: ListRenderComponent},
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  
}
