export class Article {
  constructor(
    public title: string,
    public description: string,
    public image: string,
    public date: string,
    public user: string,
    public genres: any
  ) {}
}