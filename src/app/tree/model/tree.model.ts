/** Flat node with expandable and level information */
export class TreeModel {
  constructor(
    public item: string,
    public level: number = 1,
    public isExpandable: boolean = false,
    public isLoading: boolean = false
  ) {}
}
