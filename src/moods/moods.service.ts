import { Injectable } from '@nestjs/common';
import { CreateMoodDto } from './dto/create-mood.dto';
//import { UpdateMoodDto } from './dto/update-mood.dto';
import { logger } from 'firebase-functions';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('moods');

@Injectable()
export class MoodsService {
  async create(createMoodDto: CreateMoodDto) {
    const docRef = await collectionRef.add({
      name: createMoodDto.name,
    });
    const snapshot = await docRef.get();
    const data = snapshot.data();
    const newMoodData = {
      id: docRef.id,
      ...data,
    };

    return newMoodData;
  }

  async findAll() {
    const snapshot = await collectionRef.get();
    const moodList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return moodList;
  }

  async findOne(id: string) {
    const snapshot = await collectionRef.get();
    /* const mood = snapshot.docs.map((doc) => {
      if (id === doc.id) {
        return { id: id, ...doc.data() };
      }
    }); */
    /* collectionRef
      .where('uid', '==', id)
      .get()
      .then((qss) => {
        logger.info('@qss:query@', qss.query);
        logger.info('@qss:docs@', qss.docs);
      })
      .catch((e) => {
        logger.error(e);
        throw logger.error(e);
      }); */
    return `get ${id} mood`;
  }

  /* update(id: number, updateMoodDto: UpdateMoodDto) {
    return `This action updates a #${id} mood`;
  } */

  /* remove(id: number) {
    return `This action removes a #${id} mood`;
  } */
}
