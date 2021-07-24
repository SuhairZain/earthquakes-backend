export interface IEarthQuake {
  id: string;
  significance: number;
  magnitude: number;
  time: string;
  title: string;
  info: string;
}

export interface IEarthQuakeDbInstance
  extends Omit<IEarthQuake, "significance"> {
  sig: number;
}
