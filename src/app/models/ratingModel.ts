export interface IRating {
    _id: string;
    userRated: string;  
    userRater: string;  
    score: number;      // Puntuación (1-5)
    createdAt: Date;    
  }
  
  export class Rating implements IRating {
    constructor(
      public _id: string,
      public userRated: string,
      public userRater: string,
      public score: number,
      public createdAt: Date
    ) {}
  }
  