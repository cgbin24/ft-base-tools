# 浏览器工具

浏览器工具提供了一系列用于处理浏览器环境特定功能的实用函数。

## copyToClipboard

将文本复制到剪贴板。

### 语法

```typescript
function copyToClipboard(text: string): Promise<boolean>
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| text | string | 要复制到剪贴板的文本 |

### 返回值

返回一个 Promise，成功时解析为 `true`，失败时解析为 `false`。

### 示例

```javascript
import { copyToClipboard } from 'ft-base-tools';

// 复制文本到剪贴板
copyToClipboard('Hello, World!')
  .then(success => {
    if (success) {
      console.log('文本已复制到剪贴板');
    } else {
      console.error('复制失败');
    }
  });

// 在按钮点击事件中使用
document.getElementById('copyButton').addEventListener('click', async () => {
  const text = document.getElementById('textToCopy').value;
  const success = await copyToClipboard(text);
  
  if (success) {
    showToast('复制成功');
  } else {
    showToast('复制失败');
  }
});
```

## openWindow

打开新窗口或标签页。

### 语法

```typescript
function openWindow(
  url: string,
  options?: {
    target?: string;
    features?: string | Record<string, string | number | boolean>;
    replace?: boolean;
  }
): Window | null
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| url | string | 要打开的 URL |
| options | object | 可选。窗口选项 |
| options.target | string | 可选。目标窗口名称，默认为 '_blank' |
| options.features | string \| object | 可选。窗口特性 |
| options.replace | boolean | 可选。是否替换当前历史记录，默认为 false |

### 返回值

返回新窗口的引用，如果打开失败则返回 `null`。

### 示例

```javascript
import { openWindow } from 'ft-base-tools';

// 基本用法
const newWindow = openWindow('https://example.com');

// 在指定窗口中打开
openWindow('https://example.com', { target: 'myWindow' });

// 打开具有特定尺寸的窗口
openWindow('https://example.com', {
  features: {
    width: 800,
    height: 600,
    resizable: true,
    scrollbars: true
  }
});

// 使用字符串特性
openWindow('https://example.com', {
  features: 'width=800,height=600,resizable=yes'
});

// 替换当前历史记录
openWindow('https://example.com', { replace: true });
```

## scrollToTop

平滑滚动到页面顶部。

### 语法

```typescript
function scrollToTop(options?: { behavior?: 'auto' | 'smooth' }): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| options | object | 可选。滚动选项 |
| options.behavior | 'auto' \| 'smooth' | 可选。滚动行为，默认为 'smooth' |

### 示例

```javascript
import { scrollToTop } from 'ft-base-tools';

// 平滑滚动到顶部
scrollToTop();

// 立即滚动到顶部
scrollToTop({ behavior: 'auto' });

// 在按钮点击事件中使用
document.getElementById('backToTop').addEventListener('click', () => {
  scrollToTop();
});
```

## scrollToElement

平滑滚动到指定元素。

### 语法

```typescript
function scrollToElement(
  element: string | Element,
  options?: {
    offset?: number;
    behavior?: 'auto' | 'smooth';
  }
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | string \| Element | 目标元素或选择器 |
| options | object | 可选。滚动选项 |
| options.offset | number | 可选。滚动偏移量（像素），默认为 0 |
| options.behavior | 'auto' \| 'smooth' | 可选。滚动行为，默认为 'smooth' |

### 示例

```javascript
import { scrollToElement } from 'ft-base-tools';

// 使用选择器
scrollToElement('#section-2');

// 使用元素引用
const element = document.getElementById('section-2');
scrollToElement(element);

// 设置偏移量（例如，考虑固定头部）
scrollToElement('#section-2', { offset: -60 });

// 立即滚动
scrollToElement('#section-2', { behavior: 'auto' });

// 在导航链接点击事件中使用
document.querySelectorAll('nav a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    scrollToElement(targetId, { offset: -80 });
  });
});
```

## getViewportSize

获取视口尺寸。

### 语法

```typescript
function getViewportSize(): { width: number; height: number }
```

### 返回值

返回包含视口宽度和高度的对象。

### 示例

```javascript
import { getViewportSize } from 'ft-base-tools';

const { width, height } = getViewportSize();
console.log(`视口尺寸: ${width}x${height}`);

// 在窗口调整大小时使用
window.addEventListener('resize', () => {
  const { width, height } = getViewportSize();
  console.log(`新视口尺寸: ${width}x${height}`);
});
```

## isElementInViewport

检查元素是否在视口中可见。

### 语法

```typescript
function isElementInViewport(
  element: Element,
  options?: {
    partial?: boolean;
    offset?: number;
  }
): boolean
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| element | Element | 要检查的元素 |
| options | object | 可选。检查选项 |
| options.partial | boolean | 可选。是否允许部分可见，默认为 false |
| options.offset | number | 可选。视口偏移量（像素），默认为 0 |

### 返回值

如果元素在视口中可见返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isElementInViewport } from 'ft-base-tools';

const element = document.getElementById('my-element');

// 检查元素是否完全在视口中
if (isElementInViewport(element)) {
  console.log('元素完全可见');
}

// 检查元素是否部分在视口中
if (isElementInViewport(element, { partial: true })) {
  console.log('元素至少部分可见');
}

// 使用偏移量（例如，提前检测）
if (isElementInViewport(element, { offset: 100 })) {
  console.log('元素在视口中或接近视口 100px 范围内');
}

// 实现懒加载
document.querySelectorAll('.lazy-image').forEach(img => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImg = entry.target;
        lazyImg.src = lazyImg.dataset.src;
        observer.unobserve(lazyImg);
      }
    });
  });
  
  observer.observe(img);
});
```

## getCookie

获取 Cookie 值。

### 语法

```typescript
function getCookie(name: string): string | null
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | Cookie 名称 |

### 返回值

返回 Cookie 值，如果 Cookie 不存在则返回 `null`。

### 示例

```javascript
import { getCookie } from 'ft-base-tools';

// 获取名为 'token' 的 Cookie
const token = getCookie('token');
if (token) {
  console.log(`令牌: ${token}`);
} else {
  console.log('未找到令牌');
}

// 在身份验证检查中使用
function checkAuth() {
  const authToken = getCookie('authToken');
  if (!authToken) {
    redirectToLogin();
  }
  return authToken;
}
```

## setCookie

设置 Cookie。

### 语法

```typescript
function setCookie(
  name: string,
  value: string,
  options?: {
    expires?: number | Date;
    path?: string;
    domain?: string;
    secure?: boolean;
    sameSite?: 'strict' | 'lax' | 'none';
  }
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | Cookie 名称 |
| value | string | Cookie 值 |
| options | object | 可选。Cookie 选项 |
| options.expires | number \| Date | 可选。过期时间，可以是天数（number）或具体日期（Date） |
| options.path | string | 可选。Cookie 路径，默认为 '/' |
| options.domain | string | 可选。Cookie 域名 |
| options.secure | boolean | 可选。是否仅通过 HTTPS 传输，默认为 false |
| options.sameSite | string | 可选。SameSite 属性，可选值为 'strict'、'lax' 或 'none' |

### 示例

```javascript
import { setCookie } from 'ft-base-tools';

// 基本用法
setCookie('username', '张三');

// 设置过期时间（7天后过期）
setCookie('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...', {
  expires: 7
});

// 设置具体过期日期
const expiryDate = new Date();
expiryDate.setMonth(expiryDate.getMonth() + 1);
setCookie('subscription', 'premium', {
  expires: expiryDate
});

// 设置安全 Cookie
setCookie('sessionId', '123456', {
  secure: true,
  sameSite: 'strict'
});

// 在登录成功后设置身份验证 Cookie
function login(username, password) {
  return authService.login(username, password)
    .then(response => {
      setCookie('authToken', response.token, {
        expires: 7,
        secure: true,
        sameSite: 'strict'
      });
      return response;
    });
}
```

## removeCookie

删除 Cookie。

### 语法

```typescript
function removeCookie(
  name: string,
  options?: {
    path?: string;
    domain?: string;
  }
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | Cookie 名称 |
| options | object | 可选。Cookie 选项 |
| options.path | string | 可选。Cookie 路径，默认为 '/' |
| options.domain | string | 可选。Cookie 域名 |

### 示例

```javascript
import { removeCookie } from 'ft-base-tools';

// 删除 Cookie
removeCookie('username');

// 删除特定路径下的 Cookie
removeCookie('sessionId', { path: '/admin' });

// 在注销时删除身份验证 Cookie
function logout() {
  removeCookie('authToken');
  redirectToLogin();
}
```

## getLocalStorage

从 localStorage 中获取数据。

### 语法

```typescript
function getLocalStorage<T = any>(
  key: string,
  defaultValue?: T
): T | null
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 存储键名 |
| defaultValue | T | 可选。如果数据不存在，返回的默认值 |

### 返回值

返回存储的数据，如果数据不存在且未提供默认值，则返回 `null`。

### 示例

```javascript
import { getLocalStorage } from 'ft-base-tools';

// 获取用户设置
const settings = getLocalStorage('userSettings');
if (settings) {
  applySettings(settings);
}

// 使用默认值
const theme = getLocalStorage('theme', 'light');
applyTheme(theme);

// 获取复杂数据
const userProfile = getLocalStorage('userProfile');
if (userProfile) {
  console.log(`欢迎回来，${userProfile.name}!`);
}
```

## setLocalStorage

将数据存储到 localStorage 中。

### 语法

```typescript
function setLocalStorage(
  key: string,
  value: any,
  options?: {
    expire?: number;
  }
): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 存储键名 |
| value | any | 要存储的数据，非字符串值会被自动 JSON 序列化 |
| options | object | 可选。存储选项 |
| options.expire | number | 可选。过期时间（毫秒），从当前时间算起 |

### 示例

```javascript
import { setLocalStorage } from 'ft-base-tools';

// 存储简单值
setLocalStorage('theme', 'dark');

// 存储对象
setLocalStorage('userSettings', {
  fontSize: 16,
  colorScheme: 'dark',
  notifications: true
});

// 设置过期时间（1小时后过期）
setLocalStorage('temporaryData', { id: 123, status: 'pending' }, {
  expire: 60 * 60 * 1000
});

// 保存用户会话
function saveUserSession(user) {
  setLocalStorage('userProfile', user);
  setLocalStorage('lastLogin', new Date().toISOString());
}
```

## removeLocalStorage

从 localStorage 中移除数据。

### 语法

```typescript
function removeLocalStorage(key: string): void
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| key | string | 要移除的存储键名 |

### 示例

```javascript
import { removeLocalStorage } from 'ft-base-tools';

// 移除特定项
removeLocalStorage('temporaryData');

// 在注销时清除用户数据
function logout() {
  removeLocalStorage('userProfile');
  removeLocalStorage('authToken');
  redirectToLogin();
}
```

## detectBrowser

检测当前浏览器信息。

### 语法

```typescript
function detectBrowser(): {
  name: string;
  version: string;
  isChrome: boolean;
  isFirefox: boolean;
  isSafari: boolean;
  isEdge: boolean;
  isIE: boolean;
  isOpera: boolean;
}
```

### 返回值

返回包含浏览器信息的对象。

### 示例

```javascript
import { detectBrowser } from 'ft-base-tools';

const browser = detectBrowser();
console.log(`当前浏览器: ${browser.name} ${browser.version}`);

// 根据浏览器显示不同内容
if (browser.isIE) {
  showBrowserWarning();
} else if (browser.isChrome) {
  enableChromeFeatures();
}

// 检查版本兼容性
function checkCompatibility() {
  const browser = detectBrowser();
  if (browser.isIE || (browser.isEdge && parseFloat(browser.version) < 79)) {
    return false;
  }
  return true;
}
```

## detectOS

检测当前操作系统信息。

### 语法

```typescript
function detectOS(): {
  name: string;
  version: string;
  isWindows: boolean;
  isMac: boolean;
  isLinux: boolean;
  isAndroid: boolean;
  isIOS: boolean;
}
```

### 返回值

返回包含操作系统信息的对象。

### 示例

```javascript
import { detectOS } from 'ft-base-tools';

const os = detectOS();
console.log(`当前操作系统: ${os.name} ${os.version}`);

// 根据操作系统显示不同内容
if (os.isWindows) {
  showWindowsInstructions();
} else if (os.isMac) {
  showMacInstructions();
}

// 检测移动设备
if (os.isAndroid || os.isIOS) {
  enableMobileFeatures();
} else {
  enableDesktopFeatures();
}
```

## detectDevice

检测当前设备类型。

### 语法

```typescript
function detectDevice(): {
  type: 'mobile' | 'tablet' | 'desktop';
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  orientation: 'portrait' | 'landscape';
  touchScreen: boolean;
}
```

### 返回值

返回包含设备信息的对象。

### 示例

```javascript
import { detectDevice } from 'ft-base-tools';

const device = detectDevice();
console.log(`设备类型: ${device.type}`);
console.log(`屏幕方向: ${device.orientation}`);

// 根据设备类型调整布局
if (device.isMobile) {
  enableMobileLayout();
} else if (device.isTablet) {
  enableTabletLayout();
} else {
  enableDesktopLayout();
}

// 检测触摸屏
if (device.touchScreen) {
  enableTouchFeatures();
}

// 监听屏幕方向变化
window.addEventListener('resize', () => {
  const newDevice = detectDevice();
  if (newDevice.orientation !== device.orientation) {
    handleOrientationChange(newDevice.orientation);
  }
});
```

## getUrlParameter

从 URL 获取查询参数值。

### 语法

```typescript
function getUrlParameter(
  name: string,
  url?: string
): string | null
```

### 参数

| 参数 | 类型 | 描述 |
| --- | --- | --- |
| name | string | 参数名称 |
| url | string | 可选。要解析的 URL，默认为当前页面 URL |

### 返回值

返回参数值，如果参数不存在则返回 `null`。

### 示例

```javascript
import { getUrlParameter } from 'ft-base-tools';

// 假设当前 URL 为 https://example.com?id=123&name=张三
const id = getUrlParameter('id');
console.log(id); // '123'

const name = getUrlParameter('name');
console.log(name); // '张三'

// 解析指定 URL
const page = getUrlParameter('page', 'https://example.com/search?page=2&query=test');
console.log(page); // '2'

// 在页面加载时处理 URL 参数
function initPage() {
  const productId = getUrlParameter('productId');
  if (productId) {
    loadProduct(productId);
  } else {
    showProductList();
  }
}
```

## fullscreen

控制元素全屏显示。

### 语法

```typescript
const fullscreen = {
  enter(element?: Element): Promise<void>;
  exit(): Promise<void>;
  toggle(element?: Element): Promise<void>;
  isFullscreen(): boolean;
  onChange(callback: (isFullscreen: boolean) => void): () => void;
}
```

### 方法

| 方法 | 描述 |
| --- | --- |
| enter | 使元素进入全屏模式 |
| exit | 退出全屏模式 |
| toggle | 切换全屏模式 |
| isFullscreen | 检查是否处于全屏模式 |
| onChange | 监听全屏状态变化 |

### 示例

```javascript
import { fullscreen } from 'ft-base-tools';

// 进入全屏
const videoElement = document.getElementById('myVideo');
fullscreen.enter(videoElement)
  .then(() => console.log('进入全屏模式'))
  .catch(err => console.error('全屏失败', err));

// 退出全屏
fullscreen.exit()
  .then(() => console.log('退出全屏模式'))
  .catch(err => console.error('退出全屏失败', err));

// 切换全屏
const toggleButton = document.getElementById('toggleFullscreen');
toggleButton.addEventListener('click', () => {
  fullscreen.toggle(videoElement);
});

// 检查全屏状态
if (fullscreen.isFullscreen()) {
  console.log('当前处于全屏模式');
}

// 监听全屏状态变化
const removeListener = fullscreen.onChange(isFullscreen => {
  console.log(isFullscreen ? '进入全屏' : '退出全屏');
  updateFullscreenButton(isFullscreen);
});

// 清除监听器
removeListener();
```

## notification

显示浏览器通知。

### 语法

```typescript
const notification = {
  requestPermission(): Promise<NotificationPermission>;
  show(title: string, options?: NotificationOptions): Promise<Notification | null>;
  isSupported(): boolean;
}
```

### 方法

| 方法 | 描述 |
| --- | --- |
| requestPermission | 请求通知权限 |
| show | 显示通知 |
| isSupported | 检查浏览器是否支持通知 |

### 示例

```javascript
import { notification } from 'ft-base-tools';

// 检查支持
if (!notification.isSupported()) {
  console.log('浏览器不支持通知');
}

// 请求权限
notification.requestPermission()
  .then(permission => {
    if (permission === 'granted') {
      console.log('通知权限已授予');
    } else {
      console.log('通知权限被拒绝');
    }
  });

// 显示通知
notification.show('新消息', {
  body: '您有一条新消息',
  icon: '/path/to/icon.png',
  tag: 'message',
  data: { messageId: 123 }
})
  .then(notification => {
    if (notification) {
      notification.onclick = () => {
        console.log('通知被点击');
        window.focus();
        notification.close();
      };
    }
  });

// 在收到新消息时显示通知
function handleNewMessage(message) {
  notification.show('新消息', {
    body: message.preview,
    icon: message.sender.avatar,
    data: { messageId: message.id }
  });
}
``` 