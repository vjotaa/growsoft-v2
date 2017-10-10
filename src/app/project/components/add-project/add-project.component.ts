import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from './../../../auth/auth.service';
import { User } from './../../../auth/user';
import { GLOBAL } from './../../../global';
import { Project } from './../../project';
import { ProjectService } from './../../project.service';
import { UploadService } from './../../upload.service';

@Component({
  selector: "app-add-project",
  styleUrls: ["./add-project.component.scss"],
  providers: [ProjectService, UploadService],
  template: `<div class="container b-t">
  <div class="row">
    <div class=" col-12 col-lg-6 offset-lg-3 offset-lg-3">
      <div class="box">
        <form #formProject ="ngForm" (ngSubmit)="onSubmit()">
          <h5>Crear proyecto</h5>
          <hr>
          <div *ngIf="alertMessage">
            <div class="error">
              {{alertMessage}}
            </div>
          </div>
          <div class="form-group">
            <label>Titulo</label>
            <input class="form-control" placeholder="Titulo del proyecto" type="text" name="title" required #title="ngModel" [(ngModel)]="project.title"
              only-number>
            <span *ngIf="!title.valid && title.dirty" class="error">El titulo es requerido.</span>
          </div>
          <div class="form-group">
            <label>Descripcion </label>
            <textarea class="form-control" placeholder="Ingrese la descripcion del proyecto" type="text" name="description" required #description="ngModel" [(ngModel)]="project.description"></textarea>
            <span *ngIf="!description.valid && description.dirty" class="error">La descripcion es requerida.</span>
          </div>
          <div class="form-group">
            <label>Url del proyecto</label>
            <input class="form-control" placeholder="Ingrese la url del proyecto" type="text" name="project_url" required #project_url="ngModel"
              [(ngModel)]="project.project_url">
            <span *ngIf="!project_url.valid && project_url.dirty" class="error">El correo electronico es requerido es requerido.</span>
          </div>

          <div class="form-group">
            <label> Herramientas </label>
            <div  *ngFor="let item of tools; let idx=index">
            <input  value="{{item._id}}" (change)="updateChecked(item._id,$event)" type="checkbox">{{item.name}}
       </div> 
          </div>
          <div class="center margin-y">
            <button type="submit" class="btn btn-primary" [disabled]="formProject.form.invalid">Crear usuario</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
  `
})
export class AddProjectComponent implements OnInit {
  public user: User;
  public identity;
  public token;
  public project: Project;
  public url: string;
  public alertMessage: string;
  public filesToUpload: Array<File>;
  public title: string;
  public tools;
  check: any;
  toolsSelected;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private uploadService: UploadService
  ) {
    this.title = "Crear proyecto";
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
    this.project = new Project("", "", "https://", null, "", "", "");
  }

  ngOnInit() {
    this.projectService.getTools(this.token, "").subscribe(res => {
      if (res) {
        this.tools = res;
        console.log(this.tools);
        this.check = [];
      }
    });
  }

  onSubmit() {
    console.log(this.toolsSelected);
    this.route.params.forEach((params: Params) => {
      let user_id = this.identity._id;
      this.toolsSelected = this.check.join();
      this.project.user = user_id;
      this.project.tools = this.toolsSelected;
      this.projectService.addProject(this.token, this.project).subscribe(
        response => {
          if (!response.project) {
            this.alertMessage = "Error en el servidor";
            console.log(response.project);
          } else {
            this.alertMessage = "El proyecto fue creado existosamente";
            this.project = response.project;
            console.log(response.project);
            this.router.navigate(["/editar-proyecto", response.project._id]);
          }
        },
        error => {
          var errorMessage = <any>error;
          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;
            console.log(error);
          }
        }
      );
    });
  }
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

  updateChecked(value, event) {
    if (event.target.checked) {
      this.check.push(value);
    } else if (!event.target.checked) {
      const index = this.check.indexOf(value);
      this.check.splice(index, 1);
    }
    console.log(this.check);
  }
}
