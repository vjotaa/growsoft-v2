export class ProposalProject {
  constructor(
    public title: string,
    public description: string,
    public price: string,
    public date: string,
    public user: string,
    public tools: any,
    public programmers: any,
    public designers: any,
    public fullStack: any,
    public status: string
  ) {}
}
