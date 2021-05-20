import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedInGuard } from './login-basic/loggedin.guard';
import { AboutComponent } from './about/about.component';
import { NotFoundComponent } from './error-handler/error-alert/not-found.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserDeleteComponent } from './user/user-delete/user-delete.component';
import { DocumentCreateComponent } from './document/document-create/document-create.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { SelectionProcessCreateComponent } from './selection-process/selection-process-create/selection-process-create.component';
import { SelectionProcessListComponent } from './selection-process/selection-process-list/selection-process-list.component';
import { SelectionProcessEditComponent } from './selection-process/selection-process-edit/selection-process-edit.component';
import { SelectionProcessDetailComponent } from './selection-process/selection-process-detail/selection-process-detail.component';
import {ProcessStageCreateComponent} from './process-stage/processStage-create/processStage-create.component';
import {ProcessStageListComponent} from './process-stage/processStage.list/processStage-list.component';
import {ProcessStageEditComponent} from "./process-stage/processStage-edit/processStage-edit.component";
import {CandidateCreateComponent} from './candidate/candidate-create/candidate-create.component';
import {CandidateEditComponent} from './candidate/candidate-edit/candidate-edit.component';

const routes: Routes = [
  { path: 'users/create', component: UserRegisterComponent},
  { path: 'users/:id/delete', component: UserDeleteComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id/edit', component: UserEditComponent, canActivate: [LoggedInGuard]},
  { path: 'users/:id', component: UserDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'users', component: UserListComponent, canActivate: [LoggedInGuard]},
  { path: 'selectionProcesses/:id/candidates/create', component: CandidateCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'selectionProcesses/:id/documents/create', component: DocumentCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'documents/:id', component: DocumentEditComponent, canActivate: [LoggedInGuard]},
  { path: 'candidates/:id', component: CandidateEditComponent, canActivate: [LoggedInGuard]},
  { path: 'selectionProcesses/create', component: SelectionProcessCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'selectionProcesses/:id/edit', component: SelectionProcessEditComponent, canActivate: [LoggedInGuard]},
  { path: 'selectionProcesses/:id', component: SelectionProcessDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'selectionProcesses', component: SelectionProcessListComponent, canActivate: [LoggedInGuard]},
  { path: 'about', component: AboutComponent},
  { path: '404', component: NotFoundComponent},
  { path: '', redirectTo: 'about', pathMatch: 'full'},
  { path: 'selectionProcesses/:id/processStages/create', component: ProcessStageCreateComponent, canActivate: [LoggedInGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
