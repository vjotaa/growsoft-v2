import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UploadService } from './../../upload.service';
import { GLOBAL } from './../../../global';
import { ProjectService } from './../../project.service';
import { AuthService } from './../../../auth/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from './../../project';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-edit',
  styleUrls: ['./project-edit.component.scss'],
  providers: [UploadService, ProjectService],
  template: `
  
  <form [formGroup]="rForm" (ngSubmit)="onSubmit()">
    <div formGroupName="update">
      <label class="sr-only" >Titulo</label>
      <input class="form-control" type="title" formControlName='title' [(ngModel)]="project.title" >
      <label class="sr-only" >Descripcion del proyecto</label>
      <textarea class="form-control" type="description" formControlName='description' [(ngModel)]="project.description" ></textarea>
      <label class="sr-only" >URL del proyecto</label>
      <input class="form-control" type="project_url" formControlName='project_url' [(ngModel)]="project.project_url" >
      <div *ngIf="project.image && project.image != null">
        <img src= '{{url+"imagen-proyecto/"+project.image}}' style="width: 50px;" alt="">
        <p>
          <label >Sube la imagen del proyecto</label>
          <input type="file" placegolder="Sube tu imagen"(change)="fileChangeEvent($event)">
        </p>
      </div>
    </div>
      <input type="submit"  value="Actualizar informacion" [disabled]="rForm.invalid">   
  </form>

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private uploadService: UploadService,
    private fb: FormBuilder
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
    this.project = new Project('', '', '', '', '', '');

    this.rForm = fb.group({
      update: fb.group({
        title: [null, Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.required])],
        project_url: [null, Validators.compose([Validators.required])]
      })
    });
  }

  ngOnInit() {
    this.getProject();
  }

  getProject() {
    this.route.params.forEach((params: Params) => {
      let id = params['id'];
      this.projectService.getProject(this.token, id).subscribe(
        response => {
          if (!response.project) {
            this.router.navigate(['/']);
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
      let id = params['id'];
      this.projectService.editProject(this.token, id, this.project).subscribe(
        response => {
          if (!response.project) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = 'El proyecto fue actualizado correctamente';
            if (!this.filesToUpload) {
              this.router.navigate(['/usuario', response.project.user]);
            } else {
              this.uploadService
                .makeFileRequest(
                  this.url + '/subir-imagen-proyecto/' + id,
                  [],
                  this.filesToUpload,
                  this.token,
                  'image'
                )
                .then(
                  result => {
                    this.router.navigate(['/usuario', response.project.user]);
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
}
