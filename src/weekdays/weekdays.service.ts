import { Injectable } from '@nestjs/common';
import { CreateWeekdayDto } from './dto/create-weekday.dto';
import { UpdateWeekdayDto } from './dto/update-weekday.dto';

import { firestore } from '../app.service';

const collectionRef = firestore.collection('weekdays');

@Injectable()
export class WeekdaysService {
  create(createWeekdayDto: CreateWeekdayDto) {
    return 'This action adds a new weekday';
  }

  async findAll() {
    const snapshot = await collectionRef.orderBy('order').get();
    const weekdayList = snapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...doc.data(),
      };
    });

    return weekdayList;
  }

  findOne(id: number) {
    return `This action returns a #${id} weekday`;
  }

  update(id: number, updateWeekdayDto: UpdateWeekdayDto) {
    return `This action updates a #${id} weekday`;
  }

  remove(id: number) {
    return `This action removes a #${id} weekday`;
  }
}
