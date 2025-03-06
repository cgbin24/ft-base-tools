import { $, $$, className, attr, on, off, css, formToObject } from '../../src/dom';

describe('DOM Utils', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="test" class="test-class" data-test="test-data">
        <span class="child">Child 1</span>
        <span class="child">Child 2</span>
        <form id="testForm">
          <input type="text" name="username" value="testuser">
          <input type="checkbox" name="remember" checked>
        </form>
      </div>
    `;
  });

  describe('$', () => {
    it('should select element by id', () => {
      const element = $('#test');
      expect(element).not.toBeNull();
      expect(element?.id).toBe('test');
    });

    it('should select element by class', () => {
      const element = $('.test-class');
      expect(element).not.toBeNull();
      expect(element?.className).toBe('test-class');
    });
  });

  describe('$$', () => {
    it('should select multiple elements', () => {
      const elements = $$('.child');
      expect(elements.length).toBe(2);
      expect(elements[0].textContent).toBe('Child 1');
      expect(elements[1].textContent).toBe('Child 2');
    });
  });

  describe('className', () => {
    it('should add class to element', () => {
      const element = document.createElement('div');
      className(element, 'test-class', 'add');
      
      expect(element.className).toBe('test-class');
    });
    
    it('should not add duplicate class', () => {
      const element = document.createElement('div');
      element.className = 'existing-class';
      
      className(element, 'existing-class', 'add');
      expect(element.className).toBe('existing-class');
    });
    
    it('should remove class from element', () => {
      const element = document.createElement('div');
      element.className = 'class1 class2 class3';
      
      className(element, 'class2', 'remove');
      expect(element.className).toBe('class1 class3');
    });
    
    it('should toggle class on element', () => {
      const element = document.createElement('div');
      
      // Add class when it doesn't exist
      className(element, 'test-class', 'add');
      expect(element.className).toBe('test-class');
      
      // Remove class when it exists
      className(element, 'test-class', 'remove');
      expect(element.className).toBe('');
    });
    
    it('should check if element has class', () => {
      const element = document.createElement('div');
      element.className = 'class1 class2';
      
      expect(className(element, 'class1', 'has')).toBe(true);
      expect(className(element, 'class3', 'has')).toBe(false);
    });
  });

  describe('attr', () => {
    it('should get attribute value', () => {
      const element = document.createElement('div');
      element.setAttribute('data-test', 'test-value');
      
      expect(attr.get(element, 'data-test')).toBe('test-value');
    });
    
    it('should set attribute value', () => {
      const element = document.createElement('div');
      
      attr.set(element, 'data-test', 'test-value');
      expect(element.getAttribute('data-test')).toBe('test-value');
    });
    
    it('should remove attribute', () => {
      const element = document.createElement('div');
      element.setAttribute('data-test', 'test-value');
      
      attr.remove(element, 'data-test');
      expect(element.hasAttribute('data-test')).toBe(false);
    });
  });

  describe('on/off', () => {
    it('should add event listeners with options', () => {
      const element = document.createElement('div');
      const handler = jest.fn();
      
      on(element, 'click', handler, { once: true });
      
      // 第一次点击应该触发
      element.click();
      expect(handler).toHaveBeenCalledTimes(1);
      
      // 由于设置了 once: true，第二次点击不应该触发
      element.click();
      expect(handler).toHaveBeenCalledTimes(1);
    });
    
    it('should support event delegation', () => {
      document.body.innerHTML = `
        <div id="parent">
          <button id="child">Click me</button>
        </div>
      `;
      
      const parent = document.getElementById('parent');
      const child = document.getElementById('child');
      const handler = jest.fn(e => e.target.id);
      
      on(parent!, 'click', handler);
      
      // 模拟点击子元素
      child?.click();
      
      expect(handler).toHaveBeenCalled();
      expect(handler.mock.results[0].value).toBe('child');
    });
  });

  describe('css', () => {
    it('should get computed style', () => {
      const element = document.createElement('div');
      element.style.color = 'red';
      
      document.body.appendChild(element);
      expect(css.get(element, 'color')).toBe('red');
      document.body.removeChild(element);
    });
    
    it('should set style', () => {
      const element = document.createElement('div');
      
      css.set(element, 'color', 'blue');
      expect(element.style.color).toBe('blue');
      
      css.set(element, { fontSize: '16px', fontWeight: 'bold' });
      expect(element.style.fontSize).toBe('16px');
      expect(element.style.fontWeight).toBe('bold');
    });
  });

  describe('formToObject', () => {
    it('should convert form data to object', () => {
      document.body.innerHTML = `
        <form id="testForm">
          <input type="text" name="username" value="testuser">
          <input type="email" name="email" value="test@example.com">
          <input type="checkbox" name="subscribe" checked>
          <select name="country">
            <option value="us" selected>USA</option>
            <option value="ca">Canada</option>
          </select>
          <input type="radio" name="gender" value="male" checked>
          <input type="radio" name="gender" value="female">
        </form>
      `;
      
      const form = document.getElementById('testForm') as HTMLFormElement;
      const data = formToObject(form);
      
      expect(data).toEqual({
        username: 'testuser',
        email: 'test@example.com',
        subscribe: true,
        country: 'us',
        gender: 'male'
      });
    });
  });

  // 更多测试...
}); 