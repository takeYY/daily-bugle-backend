import { CreateWeekdayDto } from 'src/weekdays/dto/create-weekday.dto';

export const testWeekdays: CreateWeekdayDto[] = [
  { name: '月曜日', order: 1, isChecked: false },
  { name: '火曜日', order: 2, isChecked: false },
  { name: '水曜日', order: 3, isChecked: false },
  { name: '木曜日', order: 4, isChecked: false },
  { name: '金曜日', order: 5, isChecked: false },
  { name: '土曜日', order: 6, isChecked: false },
  { name: '日曜日', order: 7, isChecked: false },
];
