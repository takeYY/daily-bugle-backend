import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('users');

@Injectable()
export class UsersService {
  async create(createUserDto: CreateUserDto) {
    const docRef = await collectionRef.add({
      displayName: createUserDto.displayName,
      photoDataUrl: createUserDto.photoDataUrl,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newUserData = {
      id: docRef.id,
      ...data,
    };

    return newUserData;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const userList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return userList;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
