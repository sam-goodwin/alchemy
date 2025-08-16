export type MarkAsRequired = { required: true };
export type MarkAsOptional = { optional: true };
export type MarkAsNullable = { nullable: true };

export type PickedProperty = MarkAsRequired | MarkAsOptional | MarkAsNullable;
export type PickedProperties<T> = {
  [K in keyof T]: PickedProperty;
};

export type PickFrom<T, K extends PickedProperties<T>> = T;

export type TestSource = {
  a: string;
  b: number;
  c: boolean;
};

export type TestB = PickFrom<
  TestSource,
  {
    a: {
      optional: true;
    };
    b: {
      required: true;
    };
    c: {
      optional: true;
    };
  }
>;
