export class Field {

  constructor(
    public _id: string,
    public locationID: string,
	  public dayOfTheWeek: string,
	  public startTime: string,
	  public endTime: string,
	  public fieldNr: number,
    public __v?: number
  ) {  }
  
}