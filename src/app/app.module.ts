import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbCollapseModule, NgbDropdownModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxHalClientModule } from '@lagoshny/ngx-hal-client';
import { ExternalConfigurationService } from './external-configuration-service';

import { AppRoutingModule } from './app-routing.module';
import { ErrorHandlerModule } from './error-handler/error-handler.module';
import { HttpErrorInterceptor } from './error-handler/http-error-interceptor';
import { LoginBasicModule } from './login-basic/login-basic.module';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AuthInterceptor } from './login-basic/auth-interceptor';

import { AuthenticationBasicService } from './login-basic/authentication-basic.service';
import { UserService } from './user/user.service';
import { SelectionProcessService } from './selection-process/selection-process.service';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { UserSearchComponent } from './user/user-search/user-search.component';
import { DocumentListComponent } from './document/document-list/document-list.component';
import { CandidateListComponent } from './candidate/candidate-list/candidate-list.component';

import { SelectionProcessCreateComponent } from './selection-process/selection-process-create/selection-process-create.component';
import { SelectionProcessListComponent } from './selection-process/selection-process-list/selection-process-list.component';
import { DocumentService } from './document/document.service';
import { DocumentCreateComponent } from './document/document-create/document-create.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { SelectionProcessEditComponent } from './selection-process/selection-process-edit/selection-process-edit.component';
import { SelectionProcessDetailComponent } from './selection-process/selection-process-detail/selection-process-detail.component';
import {ProcessStageCreateComponent} from './process-stage/processStage-create/processStage-create.component';
import {ProcessStageListComponent} from './process-stage/processStage.list/processStage-list.component';
import {ProcessStageEditComponent} from './process-stage/processStage-edit/processStage-edit.component';
import {ParticipantListComponent} from './participant/participant-list/participant-list.component';
import {ParticipantService} from './participant/participant.service';
import { SelectionProcessDeleteComponent } from './selection-process/selection-process-delete/selection-process-delete.component';
import {CandidateCreateComponent} from './candidate/candidate-create/candidate-create.component';
import {CandidateEditComponent} from './candidate/candidate-edit/candidate-edit.component';
import {CandidateSearchComponent} from './candidate/candidate-search/candidate-search.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserListComponent,
    UserDetailComponent,
    UserRegisterComponent,
    UserEditComponent,
    UserDeleteComponent,
    UserSearchComponent,
    SelectionProcessCreateComponent,
    SelectionProcessListComponent,
    CandidateListComponent,
    SelectionProcessCreateComponent,
    SelectionProcessEditComponent,
    SelectionProcessDetailComponent,
    DocumentListComponent,
    DocumentCreateComponent,
    DocumentEditComponent,
    ParticipantListComponent,
    DocumentEditComponent,
    SelectionProcessDeleteComponent,
    ProcessStageCreateComponent,
    ProcessStageListComponent,
    ProcessStageEditComponent,
    CandidateCreateComponent,
    CandidateEditComponent,
    CandidateSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbCollapseModule,
    NgbDropdownModule,
    NgbPaginationModule,
    NgxHalClientModule.forRoot(),
    LoginBasicModule,
    ErrorHandlerModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
    { provide: 'ExternalConfigurationService', useClass: ExternalConfigurationService },
    AuthenticationBasicService, LoggedInGuard, UserService, SelectionProcessService, DocumentService, ParticipantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
