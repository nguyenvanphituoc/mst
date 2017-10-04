import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

//components
import { FooterComponent } from './components/footer/footer.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const appRoutes: Routes = [
    {path:'', component: WelcomeComponent},
    {path:'footer', component: FooterComponent}
  ];
  
  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: true } // <-- debugging purposes only
      )
      // other imports here
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }