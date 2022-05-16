import { Injectable } from '@nestjs/common';
import { CreateOrdinaryDto } from './dto/create-ordinary.dto';
import { UpdateOrdinaryDto } from './dto/update-ordinary.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('ordinaries');

@Injectable()
export class OrdinariesService {
  create(createOrdinaryDto: CreateOrdinaryDto) {
    return 'This action adds a new ordinary';
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
