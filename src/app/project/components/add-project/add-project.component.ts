import { UploadService } from './../../upload.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GLOBAL } from './../../../global';
import { ProjectService } from './../../project.service';
import { AuthService } from './../../../auth/auth.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Project } from './../../project';
import { User } from './../../../auth/user';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-add-project',
  styleUrls: ['./add-project.component.scss'],
  providers: [ProjectService, UploadService],
  template: `
    {{alertMessage}}
    <form [formGroup]="rForm" (ngSubmit)="onSubmit()">
      <div formGroupName="create">
        <label class="sr-only" >Titulo</label>
        titulo
        <input class="form-control" type="title" formControlName='title' [(ngModel)]="project.title" >
        <label class="sr-only" >Descripcion del proyecto</label>
des
        <textarea class="form-control" type="description" formControlName='description' [(ngModel)]="project.description" ></textarea>
        <label class="sr-only" >URL del proyecto</label>
   
   link
        <input class="form-control" type="project_url" formControlName='project_url' [(ngModel)]="project.project_url" >
      </div>
        <input type="submit"  value="Actualizar informacion" [disabled]="rForm.invalid">   
    </form>

  `
})
export class AddProjectComponent implements OnInit {
  public rForm: FormGroup;
  public user: User;
  public identity;
  public token;
  public project: Project;
  public url: string;
  public alertMessage: string;
  public filesToUpload: Array<File>;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private projectService: ProjectService,
    private fb: FormBuilder,
    private uploadService: UploadService
  ) {
    this.identity = this.authService.getIdentity();
    this.token = this.authService.getToken();
    this.url = GLOBAL.url;
    this.project = new Project('', '', 'https://', null, '', '');

    this.rForm = fb.group({
      create: fb.group({
        title: [null, Validators.compose([Validators.required])],
        description: [null, Validators.compose([Validators.required])],
        project_url: [null, Validators.compose([Validators.required])]
      })
    });
  }

  ngOnInit() {}

  onSubmit() {
    this.route.params.forEach((params: Params) => {
      let user_id = this.identity._id;
      this.project.user = user_id;

      this.projectService.addProject(this.token, this.project).subscribe(
        response => {
          if (!response.project) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = 'El proyecto fue creado existosamente';
            this.project = response.project;
            this.router.navigate(['/editar-proyecto', response.project._id]);
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
