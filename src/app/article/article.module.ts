import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ArticleRoutingModule } from './article-routing.module';
import { CreateArticleComponent } from './components/create-article/create-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { ArticleViewerComponent } from './container/article-viewer/article-viewer.component';

@NgModule({
  imports: [ArticleRoutingModule, CommonModule, FormsModule],
  declarations: [
    CreateArticleComponent,
    UpdateArticleComponent,
    ArticleViewerComponent
  ]
})
export class ArticleModule {}
