import { userModel } from '../models/user-model.js';
import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import mailService from './mail-service.js';
import tokenService from './token-service.js';
import { UserDto } from '../dtos/user-dtos.js';

class UserService {
  async registration(email, password) {
    const canditae = await userModel.findOne({ email });

    if (canditae) {
      throw new Error(`Пользователь с таким почтовым адресом уже существует`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    console.log('hashPassword: ', hashPassword);
    const activationLink = v4();

    const user = await userModel.create({ email, password: hashPassword, activationLink });
    await mailService.sendActivationMail(email, activationLink);

    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }
}

const userService = new UserService();
export default userService;
