import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export function ConvertDateToJST(fulldate: string): string {
  const jstTime = dayjs.utc(fulldate).tz('Asia/Tokyo');
  return jstTime.format('YYYY-MM-DD HH:mm');
}
