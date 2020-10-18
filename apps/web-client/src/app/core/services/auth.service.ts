import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _id = '5f8a134c2d2c9161f2dad2fe';

  get id() {
    return this._id;
  }

  set id(value: string) {
    this._id = value;
  }
}
