import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/userUpdate.dto';
import { UserSettings } from 'src/schemas/userSettings.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(UserSettings.name)
    private UserSettingsModel: Model<UserSettings>,
  ) {}

  getUser() {
    return this.userModel.find();
  }

  async getUserById(userId: string) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return findUser;
  }

  async createUser({ setting, ...createUserDto }: CreateUserDto) {
    const existingUser = await this.userModel.findOne({
      username: createUserDto.username,
    });
    if (existingUser)
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    if (setting) {
      const newSettings = new this.UserSettingsModel(setting)
      const saved = await newSettings.save()
      const newUser = new this.userModel({
        ...createUserDto, settings: saved._id
      }) 
      return newUser.save()
    }
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(userId: string, updateUserDto: UpdateUserDto) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, {
      new: true,
    });
  }

  async deleteUser(userId: string) {
    const findUser = await this.userModel.findById(userId);
    if (!findUser)
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    return this.userModel.findByIdAndDelete(userId);
  }
}
