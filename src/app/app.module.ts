import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './users/users.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UsersEffects } from './store/users/users.effects';
import { HttpClientModule } from '@angular/common/http';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment'; // Angular CLI environment
import { reducers, appsStateKey } from './store';
import { UsersReducer } from './store/users';
import { EntityUserComponent } from './entity-user/entity-user.component';

@NgModule({
  declarations: [AppComponent, UsersComponent, EntityUserComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(
      { },
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true
          // strictStateSerializability: true,
          // strictActionSerializability: true
        }
      }
    ),
    StoreModule.forFeature(appsStateKey, reducers),

    EffectsModule.forRoot([UsersEffects]),
    // EffectsModule.forFeature([UsersEffects]),

    StoreDevtoolsModule.instrument({
      name: 'NgRx Testing',
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
