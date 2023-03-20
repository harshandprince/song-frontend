import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';
import { LoginComponent } from './login/LoginComponent';
import { DownloadComponent } from './download/download.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainviewComponent } from './mainview/mainview.component';
import { CreateCertTypeComponent } from './create-cert-type/create-cert-type.component';
import { ViewCertTypesComponent } from './view-cert-types/view-cert-types.component';
import { EditCertTypeComponent } from './edit-cert-type/edit-cert-type.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from '../auth.guard';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { QueryComponent } from './query/query.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatDialogModule} from '@angular/material/dialog';
@NgModule({
  declarations: [LoginComponent, HomeComponent, CreateComponent, EditComponent, ViewComponent, DownloadComponent, MainviewComponent, CreateCertTypeComponent, ViewCertTypesComponent, EditCertTypeComponent, QueryComponent],
  imports: [
    MatDialogModule,
    AngularEditorModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      { path: 'login', component: LoginComponent },
      {
        path: 'panel', component: MainviewComponent, children: [
          { path: '', pathMatch: "full", redirectTo: "home" },
          { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
          { path: 'create', component: CreateComponent, canActivate: [AuthGuard] },
          { path: 'view', component: ViewComponent, canActivate: [AuthGuard] },
          { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
          { path: 'download', component: DownloadComponent, canActivate: [AuthGuard] },
          { path: 'create-cert-type', component: CreateCertTypeComponent, canActivate: [AuthGuard] },
          { path: 'view-cert-types', component: ViewCertTypesComponent, canActivate: [AuthGuard] },
          { path: 'edit-cert-type/:id', component: EditCertTypeComponent, canActivate: [AuthGuard] },
          { path: 'query', component: QueryComponent, canActivate: [AuthGuard] }
        ]
      }
    ]),
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatTooltipModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [AuthGuard]
})
export class PanelModule { }
