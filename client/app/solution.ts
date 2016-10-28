export class Solution {

  constructor(
    public _id: string,
    public fieldID: number,
    public location: string,
	  public dayOfWeek: string,
	  public startTime: number,
	  public endTime: number,
	  public field: number,
    public asignedTo: string,
    public trainerScore?: number,
    public connectionScore?: number,
    public multipleTrainingScore?: number,
    public __v?: number
  ) {  }
  
}