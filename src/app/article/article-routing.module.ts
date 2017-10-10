import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CreateArticleComponent } from './components/create-article/create-article.component';
import { UpdateArticleComponent } from './components/update-article/update-article.component';
import { ArticleViewerComponent } from './container/article-viewer/article-viewer.component';

const routes: Routes = [
  { path: "articulo/:id", component: ArticleViewerComponent },
  { path: "crear-articulo", component: CreateArticleComponent },
  { path: "editar-articulo/:id", component: UpdateArticleComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule {}
