export class UserDto {
  id;
  isActivated;
  email;

  constructor(model) {
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.email = model.email;
  }
}
