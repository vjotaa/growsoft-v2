import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AuthService } from './../../../auth/auth.service';
import { GLOBAL } from './../../../global';
import { Project } from './../../project';
import { ProjectService } from './../../project.service';
import { UploadService } from './../../upload.service';

@Component({
  selector: "app-project-edit",
  styleUrls: ["./project-edit.component.scss"],
  providers: [UploadService, ProjectService],
  template: `
  
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

        <div *ngIf="project.image && project.image != null">
          <img src= '{{url+"imagen-proyecto/"+project.image}}' style="width: 50px;" alt="">
          <p>
            <label >Sube la imagen del proyecto</label>
            <input type="file" placegolder="Sube tu imagen"(change)="fileChangeEvent($event)">
          </p>
        </div>

        <div class="form-group">
        <label> Herramientas </label>
        <div  *ngFor="let item of tools; let idx=index">
        <input  value="{{item._id}}" (change)="updateChecked(item._id,$event)" type="checkbox">{{item.name}}
      </div> 
      </div>

        <div class="center margin-y">
          <button type="submit" class="btn btn-primary" [disabled]="formProject.form.invalid">Modificar proyecto</button>
        </div>
      </form>
    </div>
  </div>
</div>

  `
})
export class ProjectEditComponent implements OnInit {
  public rForm: FormGroup;
  public project: Project;
  public identity;
  public token;
  public url: string;
  public filesToUpload: Array<File>;
  public alertMessage: string;
  public tools: any;
  public toolsSelected: any;
  public check;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private uploadService: UploadService
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
    this.project = new Project("", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.getProject();
    this.projectService.getTools(this.token, "").subscribe(res => {
      if (res) {
        this.tools = res;
        console.log(this.tools);
        this.check = [];
      }
    });
  }

  getProject() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];

      this.projectService.getProject(this.token, id).subscribe(
        response => {
          if (!response.project) {
            this.router.navigate(["/"]);
          } else {
            this.project = response.project;
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

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let id = params["id"];
      this.toolsSelected = this.check.join();
      this.project.tools = this.toolsSelected;
      this.projectService.editProject(this.token, id, this.project).subscribe(
        response => {
          if (!response.project) {
            this.alertMessage = "Error en el servidor";
          } else {
            this.alertMessage = "El proyecto fue actualizado correctamente";
            if (!this.filesToUpload) {
              this.router.navigate(["/proyecto", response.project._id]);
            } else {
              this.uploadService
                .makeFileRequest(
                  this.url + "/subir-imagen-proyecto/" + id,
                  [],
                  this.filesToUpload,
                  this.token,
                  "image"
                )
                .then(
                  result => {
                    this.router.navigate(["/proyecto", response.project._id]);
                  },
                  error => {
                    console.log(error);
                  }
                );
            }
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
