import { isPhone, isEmail, isUrl, isIdCard } from '../../src/validator';

describe('Validator Utils', () => {
  describe('isPhone', () => {
    it('should validate correct phone numbers', () => {
      expect(isPhone('13800138000').valid).toBe(true);
      expect(isPhone('13912345678').valid).toBe(true);
    });

    it('should invalidate incorrect phone numbers', () => {
      expect(isPhone('1380013800').valid).toBe(false);
      expect(isPhone('2380013800').valid).toBe(false);
      expect(isPhone('138001380001').valid).toBe(false);
      expect(isPhone('abcdefghijk').valid).toBe(false);
    });
  });

  describe('isEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isEmail('test@example.com').valid).toBe(true);
      expect(isEmail('user.name+tag@example.co.uk').valid).toBe(true);
    });

    it('should invalidate incorrect email addresses', () => {
      expect(isEmail('test@').valid).toBe(false);
      expect(isEmail('test@example').valid).toBe(false);
      expect(isEmail('test.example.com').valid).toBe(false);
    });
  });

  describe('isUrl', () => {
    it('should validate correct URLs', () => {
      expect(isUrl('https://example.com').valid).toBe(true);
      expect(isUrl('http://sub.example.co.uk/path?query=1').valid).toBe(true);
      expect(isUrl('ftp://files.example.org').valid).toBe(true);
    });
    
    it('should invalidate incorrect URLs', () => {
      expect(isUrl('not-a-url').valid).toBe(false);
      expect(isUrl('http:/example.com').valid).toBe(false);
      expect(isUrl('https://.com').valid).toBe(false);
    });
  });

  describe('isIdCard', () => {
    it('should validate correct Chinese ID cards', () => {
      // Note: These are fake ID numbers for testing
      expect(isIdCard('110101199003070953').valid).toBe(true);
      expect(isIdCard('11010119900307095X').valid).toBe(true);
    });
    
    it('should invalidate incorrect ID cards', () => {
      expect(isIdCard('1101011990030709').valid).toBe(false); // Too short
      expect(isIdCard('11010119900307095Y').valid).toBe(false); // Invalid check digit
      expect(isIdCard('110101299003070953').valid).toBe(false); // Invalid date
    });
  });

  // 更多测试...
}); 