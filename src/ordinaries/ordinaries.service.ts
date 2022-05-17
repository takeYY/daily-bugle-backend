import { Injectable } from '@nestjs/common';
import { CreateOrdinaryDto } from './dto/create-ordinary.dto';
import { UpdateOrdinaryDto } from './dto/update-ordinary.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('ordinaries');

@Injectable()
export class OrdinariesService {
  async create(createOrdinaryDto: CreateOrdinaryDto) {
    const docRef = await collectionRef.add({
      name: createOrdinaryDto.name,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newOrdinaryData = {
      id: docRef.id,
      ...data,
    };

    return newOrdinaryData;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const ordinaryList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return ordinaryList;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordinary`;
  }

  update(id: number, updateOrdinaryDto: UpdateOrdinaryDto) {
    return `This action updates a #${id} ordinary`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordinary`;
  }
}
