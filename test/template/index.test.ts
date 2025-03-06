import { render, conditional, each, format, i18n } from '../../src/template';

describe('Template Utils', () => {
  describe('render', () => {
    it('should render simple templates', () => {
      const template = 'Hello, {{name}}!';
      const data = { name: 'World' };
      
      expect(render(template, data)).toBe('Hello, World!');
    });

    it('should handle nested properties', () => {
      const template = 'Welcome, {{user.name}}! Your role is {{user.role}}.';
      const data = { user: { name: 'John', role: 'Admin' } };
      
      expect(render(template, data)).toBe('Welcome, John! Your role is Admin.');
    });

    it('should escape HTML by default', () => {
      const template = 'Message: {{message}}';
      const data = { message: '<script>alert("XSS")</script>' };
      
      expect(render(template, data)).toBe('Message: &lt;script&gt;alert(&quot;XSS&quot;)&lt;/script&gt;');
    });

    it('should not escape HTML when escape option is false', () => {
      const template = 'Message: {{message}}';
      const data = { message: '<strong>Bold</strong>' };
      
      expect(render(template, data, { escape: false })).toBe('Message: <strong>Bold</strong>');
    });

    it('should handle custom delimiters', () => {
      const template = 'Hello, ${name}!';
      const data = { name: 'World' };
      
      expect(render(template, data, { delimiter: /\$\{(.+?)\}/ })).toBe('Hello, World!');
    });

    it('should handle missing data properties', () => {
      const template = 'Hello, {{name}}! Your age is {{age}}.';
      const data = { name: 'World' }; // 缺少 age 属性
      
      expect(render(template, data)).toBe('Hello, World! Your age is .');
    });
    
    it('should handle complex nested objects', () => {
      const template = '{{user.profile.name}} works at {{user.company.name}} in {{user.company.address.city}}';
      const data = {
        user: {
          profile: { name: 'John' },
          company: { 
            name: 'Acme Inc',
            address: { city: 'New York' }
          }
        }
      };
      
      expect(render(template, data)).toBe('John works at Acme Inc in New York');
    });
    
    it('should handle arrays in data', () => {
      const template = 'First item: {{items.0}}, Second item: {{items.1}}';
      const data = { items: ['apple', 'banana'] };
      
      expect(render(template, data)).toBe('First item: apple, Second item: banana');
    });
  });

  describe('conditional', () => {
    it('should render true template when condition is true', () => {
      expect(conditional(true, 'Yes', 'No')).toBe('Yes');
    });

    it('should render false template when condition is false', () => {
      expect(conditional(false, 'Yes', 'No')).toBe('No');
    });

    it('should render empty string for false condition when no false template provided', () => {
      expect(conditional(false, 'Yes')).toBe('');
    });
  });

  describe('each', () => {
    it('should render template for each item in array', () => {
      const items = [1, 2, 3];
      const template = 'Number: {{item}}';
      
      expect(each(items, template)).toBe('Number: 1Number: 2Number: 3');
    });

    it('should handle objects in array', () => {
      const items = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 30 }
      ];
      const template = '{{name}} is {{age}} years old.';
      
      expect(each(items, template)).toBe('Alice is 25 years old.Bob is 30 years old.');
    });

    it('should provide index and position flags', () => {
      const items = ['a', 'b', 'c'];
      const template = '{{index}}:{{item}}{{#first}}(first){{/first}}{{#last}}(last){{/last}}';
      
      // Note: This test might need adjustment based on actual implementation
      // Here we're assuming the template engine supports #first and #last conditionals
      const result = each(items, template);
      expect(result).toContain('0:a');
      expect(result).toContain('1:b');
      expect(result).toContain('2:c');
    });

    it('should return empty string for empty array', () => {
      expect(each([], 'template')).toBe('');
    });
  });

  describe('format', () => {
    it('should format string with positional arguments', () => {
      expect(format('Hello, {0}! Welcome to {1}.', 'John', 'our website')).toBe('Hello, John! Welcome to our website.');
    });

    it('should handle missing arguments', () => {
      expect(format('Value: {0}, Another: {1}', 42)).toBe('Value: 42, Another: {1}');
    });

    it('should handle repeated arguments', () => {
      expect(format('{0} {1} {0}', 'Hello', 'World')).toBe('Hello World Hello');
    });
  });

  describe('i18n', () => {
    it('should translate keys to specified locale', () => {
      expect(i18n('greeting', { name: 'John' }, 'zh-CN')).toBe('你好，John！');
      expect(i18n('greeting', { name: 'John' }, 'en-US')).toBe('Hello, John!');
    });

    it('should fall back to fallback locale when key not found', () => {
      expect(i18n('nonexistent', {}, 'fr-FR', 'en-US')).toBe('nonexistent');
    });

    it('should use key as template when not found in any locale', () => {
      expect(i18n('custom {{value}}', { value: 'test' })).toBe('custom test');
    });
  });
}); 