export interface ITimestamp {
  seconds: number;
  nanoseconds: number;
}

export interface IIngredient {
  id: string;
  value: string;
}

export interface IStep {
  id: string;
  value: string;
}

export interface IRecipe {
  createdAt: ITimestamp | null;
  user: string | null;
  id: string | null;
  title: string;
  desc: string;
  deleted: boolean;
  photoUrl: string;
  steps: IStep[];
  ingredients: IIngredient[];
}
