import { format, parse, addTime, diffTime, isLeapYear, getDateRange, relativeTime } from '../../src/date';

describe('Date Utils', () => {
  describe('format', () => {
    it('should format date correctly', () => {
      const date = new Date(2023, 0, 15, 14, 30, 45);
      expect(format(date, 'YYYY-MM-DD')).toBe('2023-01-15');
      expect(format(date, 'YYYY/MM/DD')).toBe('2023/01/15');
      expect(format(date, 'YYYY-MM-DD HH:mm:ss')).toBe('2023-01-15 14:30:45');
      expect(format(date, 'MM/DD/YYYY')).toBe('01/15/2023');
    });

    it('should handle custom format tokens', () => {
      const date = new Date(2023, 0, 15, 14, 30, 45);
      expect(format(date, 'YYYY年MM月DD日')).toBe('2023年01月15日');
      expect(format(date, 'HH时mm分ss秒')).toBe('14时30分45秒');
    });
  });

  describe('parse', () => {
    it('should parse date string correctly', () => {
      expect(parse('2023-01-15').toDateString()).toBe(new Date(2023, 0, 15).toDateString());
      expect(parse('2023/01/15', 'YYYY/MM/DD').toDateString()).toBe(new Date(2023, 0, 15).toDateString());
      expect(parse('01/15/2023', 'MM/DD/YYYY').toDateString()).toBe(new Date(2023, 0, 15).toDateString());
      
      const dateTime = parse('2023-01-15 14:30:45', 'YYYY-MM-DD HH:mm:ss');
      expect(dateTime.getFullYear()).toBe(2023);
      expect(dateTime.getMonth()).toBe(0);
      expect(dateTime.getDate()).toBe(15);
      expect(dateTime.getHours()).toBe(14);
      expect(dateTime.getMinutes()).toBe(30);
      expect(dateTime.getSeconds()).toBe(45);
    });
  });

  describe('addTime', () => {
    it('should add time correctly', () => {
      const date = new Date(2023, 0, 15);
      
      expect(addTime(date, 1, 'days').toDateString()).toBe(new Date(2023, 0, 16).toDateString());
      expect(addTime(date, 1, 'months').toDateString()).toBe(new Date(2023, 1, 15).toDateString());
      expect(addTime(date, 1, 'years').toDateString()).toBe(new Date(2024, 0, 15).toDateString());
      
      const time = new Date(2023, 0, 15, 12, 30, 45);
      expect(addTime(time, 1, 'hours').getHours()).toBe(13);
      expect(addTime(time, 15, 'minutes').getMinutes()).toBe(45);
      expect(addTime(time, 30, 'seconds').getSeconds()).toBe(15);
    });
    
    it('should handle negative values', () => {
      const date = new Date(2023, 0, 15);
      
      expect(addTime(date, -1, 'days').toDateString()).toBe(new Date(2023, 0, 14).toDateString());
      expect(addTime(date, -1, 'months').toDateString()).toBe(new Date(2022, 11, 15).toDateString());
      expect(addTime(date, -1, 'years').toDateString()).toBe(new Date(2022, 0, 15).toDateString());
    });
  });

  describe('diffTime', () => {
    it('should calculate time difference correctly', () => {
      const date1 = new Date(2023, 0, 15);
      const date2 = new Date(2023, 0, 20);
      
      expect(diffTime(date1, date2, 'days')).toBe(5);
      expect(diffTime(date2, date1, 'days')).toBe(-5);
      
      const time1 = new Date(2023, 0, 15, 12, 0, 0);
      const time2 = new Date(2023, 0, 15, 14, 30, 0);
      
      expect(diffTime(time1, time2, 'hours')).toBe(2);
      expect(diffTime(time1, time2, 'minutes')).toBe(150);
      
      const year1 = new Date(2020, 0, 1);
      const year2 = new Date(2023, 6, 1);
      
      expect(diffTime(year1, year2, 'years')).toBe(3);
      expect(diffTime(year1, year2, 'months')).toBe(42);
    });
  });

  describe('isLeapYear', () => {
    it('should identify leap years correctly', () => {
      expect(isLeapYear(2020)).toBe(true);
      expect(isLeapYear(2024)).toBe(true);
      expect(isLeapYear(2000)).toBe(true);
      
      expect(isLeapYear(2023)).toBe(false);
      expect(isLeapYear(2100)).toBe(false);
      expect(isLeapYear(1900)).toBe(false);
      
      expect(isLeapYear(new Date(2020, 0, 1))).toBe(true);
      expect(isLeapYear(new Date(2023, 0, 1))).toBe(false);
    });
  });

  describe('getDateRange', () => {
    it('should generate date range correctly', () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 0, 5);
      
      const range = getDateRange(start, end);
      expect(range.length).toBe(5);
      expect(range[0].toDateString()).toBe(new Date(2023, 0, 1).toDateString());
      expect(range[4].toDateString()).toBe(new Date(2023, 0, 5).toDateString());
    });
    
    it('should handle custom step', () => {
      const start = new Date(2023, 0, 1);
      const end = new Date(2023, 0, 10);
      
      const range = getDateRange(start, end, 2);
      expect(range.length).toBe(5);
      expect(range[0].toDateString()).toBe(new Date(2023, 0, 1).toDateString());
      expect(range[1].toDateString()).toBe(new Date(2023, 0, 3).toDateString());
      expect(range[4].toDateString()).toBe(new Date(2023, 0, 9).toDateString());
    });
  });

  describe('relativeTime', () => {
    it('should format relative time correctly', () => {
      const now = new Date(2023, 0, 15, 12, 0, 0);
      
      // 几秒前
      const seconds = new Date(2023, 0, 15, 11, 59, 30);
      expect(relativeTime(seconds, now)).toBe('几秒前');
      
      // 分钟
      const minutes = new Date(2023, 0, 15, 11, 30, 0);
      expect(relativeTime(minutes, now)).toBe('30分钟前');
      
      // 小时
      const hours = new Date(2023, 0, 15, 8, 0, 0);
      expect(relativeTime(hours, now)).toBe('4小时前');
      
      // 天
      const days = new Date(2023, 0, 10, 12, 0, 0);
      expect(relativeTime(days, now)).toBe('5天前');
      
      // 月
      const months = new Date(2022, 10, 15, 12, 0, 0);
      expect(relativeTime(months, now)).toBe('2个月前');
      
      // 年
      const years = new Date(2020, 0, 15, 12, 0, 0);
      expect(relativeTime(years, now)).toBe('3年前');
      
      // 未来时间
      const future = new Date(2023, 0, 20, 12, 0, 0);
      expect(relativeTime(future, now)).toBe('5天后');
    });
    
    it('should support custom labels', () => {
      const now = new Date(2023, 0, 15, 12, 0, 0);
      const past = new Date(2023, 0, 14, 12, 0, 0);
      
      const options = {
        past: '%s ago',
        d: 'a day',
        dd: '%d days'
      };
      
      expect(relativeTime(past, now, options)).toBe('a day ago');
      
      const pastDays = new Date(2023, 0, 10, 12, 0, 0);
      expect(relativeTime(pastDays, now, options)).toBe('5 days ago');
    });
  });
}); 