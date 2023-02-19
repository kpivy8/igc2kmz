export class OpenStruct {
  public a: string = "bonjour";
}

export class Bounds {
  min: any;
  max: any;
  constructor(value: any[] | any) {
    if (value instanceof Array) {
      if (value.length == 2) {
        this.min = value[0];
        this.max = value[1];
      } else {
        this.min = value[0];
        this.max = value[0];
        for (let i = 0; i < value.length; i++) {
          if (value[i] < this.min)
            this.min = value[i];
          if (value[i] > this.max)
            this.max = value[i];
        }
      }
    } else {
      this.min = value;
      this.max = value;
    }
  }

  static createbounds(value: any[] | any): Bounds | null {
    if (value instanceof Array && value.length == 0) {
      return null;
    } else if (value == null) {
      return null;
    }
    return new Bounds(value);
  }

  update(value: Bounds | any) {
    if (value instanceof Bounds) {
      if (value.min < this.min)
        this.min = value.min;
      if (value.max > this.max)
        this.max = value.max;
    } else {
      if (value < this.min)
        this.min = value;
      if (value > this.max)
        this.max = value;
    }
  }

  tuple(): [any, any] {
    return [this.min, this.max];
  }
}

export type BoundSet = Record<string, Bounds|null>;
