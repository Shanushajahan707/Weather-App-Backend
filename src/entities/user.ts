export class User {
    constructor(
      public readonly email: string,
      public readonly password: string,
      public readonly isblocked: boolean,
      public readonly _id?: string
    ) {}
  }