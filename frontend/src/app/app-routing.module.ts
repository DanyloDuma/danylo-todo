import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{ path: '', component: AboutComponent },
  //{ path: 'about', component: AboutComponent },
  //{ path: 'contact', component: ContactComponent },
  //{ path: 'home', component: HomeComponent },
  //{ path: 'news', component: NewsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
