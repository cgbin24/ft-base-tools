# 设备工具

设备工具提供了一系列用于检测设备类型、浏览器环境和操作系统的实用函数。

## isMobile

检测当前设备是否为移动设备。

### 语法

```typescript
function isMobile(): boolean
```

### 返回值

如果当前设备是移动设备（手机或平板），返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isMobile } from 'ft-base-tools';

if (isMobile()) {
  console.log('当前是移动设备');
} else {
  console.log('当前是桌面设备');
}
```

## isIOS

检测当前设备是否为 iOS 设备。

### 语法

```typescript
function isIOS(): boolean
```

### 返回值

如果当前设备是 iOS 设备（iPhone、iPad 或 iPod），返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isIOS } from 'ft-base-tools';

if (isIOS()) {
  console.log('当前是 iOS 设备');
} else {
  console.log('当前不是 iOS 设备');
}
```

## isAndroid

检测当前设备是否为 Android 设备。

### 语法

```typescript
function isAndroid(): boolean
```

### 返回值

如果当前设备是 Android 设备，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isAndroid } from 'ft-base-tools';

if (isAndroid()) {
  console.log('当前是 Android 设备');
} else {
  console.log('当前不是 Android 设备');
}
```

## isTablet

检测当前设备是否为平板设备。

### 语法

```typescript
function isTablet(): boolean
```

### 返回值

如果当前设备是平板设备，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isTablet } from 'ft-base-tools';

if (isTablet()) {
  console.log('当前是平板设备');
} else {
  console.log('当前不是平板设备');
}
```

## isWechat

检测当前环境是否为微信浏览器。

### 语法

```typescript
function isWechat(): boolean
```

### 返回值

如果当前环境是微信浏览器，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isWechat } from 'ft-base-tools';

if (isWechat()) {
  console.log('当前在微信浏览器中');
} else {
  console.log('当前不在微信浏览器中');
}
```

## isAlipay

检测当前环境是否为支付宝客户端。

### 语法

```typescript
function isAlipay(): boolean
```

### 返回值

如果当前环境是支付宝客户端，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isAlipay } from 'ft-base-tools';

if (isAlipay()) {
  console.log('当前在支付宝客户端中');
} else {
  console.log('当前不在支付宝客户端中');
}
```

## isChrome

检测当前浏览器是否为 Chrome。

### 语法

```typescript
function isChrome(): boolean
```

### 返回值

如果当前浏览器是 Chrome，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isChrome } from 'ft-base-tools';

if (isChrome()) {
  console.log('当前是 Chrome 浏览器');
} else {
  console.log('当前不是 Chrome 浏览器');
}
```

## isSafari

检测当前浏览器是否为 Safari。

### 语法

```typescript
function isSafari(): boolean
```

### 返回值

如果当前浏览器是 Safari，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isSafari } from 'ft-base-tools';

if (isSafari()) {
  console.log('当前是 Safari 浏览器');
} else {
  console.log('当前不是 Safari 浏览器');
}
```

## isFirefox

检测当前浏览器是否为 Firefox。

### 语法

```typescript
function isFirefox(): boolean
```

### 返回值

如果当前浏览器是 Firefox，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isFirefox } from 'ft-base-tools';

if (isFirefox()) {
  console.log('当前是 Firefox 浏览器');
} else {
  console.log('当前不是 Firefox 浏览器');
}
```

## isIE

检测当前浏览器是否为 Internet Explorer。

### 语法

```typescript
function isIE(): boolean
```

### 返回值

如果当前浏览器是 Internet Explorer，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isIE } from 'ft-base-tools';

if (isIE()) {
  console.log('当前是 IE 浏览器');
  // 提供 IE 兼容性提示
  alert('您的浏览器版本过低，建议升级到现代浏览器以获得更好的体验');
} else {
  console.log('当前不是 IE 浏览器');
}
```

## isEdge

检测当前浏览器是否为 Microsoft Edge。

### 语法

```typescript
function isEdge(): boolean
```

### 返回值

如果当前浏览器是 Microsoft Edge，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isEdge } from 'ft-base-tools';

if (isEdge()) {
  console.log('当前是 Edge 浏览器');
} else {
  console.log('当前不是 Edge 浏览器');
}
```

## getOS

获取当前操作系统信息。

### 语法

```typescript
function getOS(): {
  name: 'iOS' | 'Android' | 'Windows' | 'MacOS' | 'Linux' | 'Unknown';
  version: string;
}
```

### 返回值

返回一个包含操作系统名称和版本的对象。

### 示例

```javascript
import { getOS } from 'ft-base-tools';

const osInfo = getOS();
console.log(`操作系统: ${osInfo.name}, 版本: ${osInfo.version}`);
// 例如: "操作系统: MacOS, 版本: 10.15.7"
```

## getBrowser

获取当前浏览器信息。

### 语法

```typescript
function getBrowser(): {
  name: 'Chrome' | 'Firefox' | 'Safari' | 'IE' | 'Edge' | 'Opera' | 'Unknown';
  version: string;
}
```

### 返回值

返回一个包含浏览器名称和版本的对象。

### 示例

```javascript
import { getBrowser } from 'ft-base-tools';

const browserInfo = getBrowser();
console.log(`浏览器: ${browserInfo.name}, 版本: ${browserInfo.version}`);
// 例如: "浏览器: Chrome, 版本: 91.0.4472.124"
```

## getScreenSize

获取当前屏幕尺寸信息。

### 语法

```typescript
function getScreenSize(): {
  width: number;
  height: number;
  orientation: 'portrait' | 'landscape';
  dpr: number;
}
```

### 返回值

返回一个包含屏幕宽度、高度、方向和设备像素比的对象。

### 示例

```javascript
import { getScreenSize } from 'ft-base-tools';

const screenInfo = getScreenSize();
console.log(`屏幕尺寸: ${screenInfo.width}x${screenInfo.height}`);
console.log(`屏幕方向: ${screenInfo.orientation}`);
console.log(`设备像素比: ${screenInfo.dpr}`);
```

## isOnline

检测当前设备是否在线。

### 语法

```typescript
function isOnline(): boolean
```

### 返回值

如果当前设备在线，返回 `true`，否则返回 `false`。

### 示例

```javascript
import { isOnline } from 'ft-base-tools';

if (isOnline()) {
  console.log('设备已连接到网络');
} else {
  console.log('设备未连接到网络');
  // 显示离线提示
  showOfflineNotification();
}
```

## getNetworkType

获取当前网络连接类型。

### 语法

```typescript
function getNetworkType(): 'wifi' | '4g' | '3g' | '2g' | 'unknown' | 'none'
```

### 返回值

返回当前网络连接类型的字符串。

### 示例

```javascript
import { getNetworkType } from 'ft-base-tools';

const networkType = getNetworkType();
console.log(`当前网络类型: ${networkType}`);

// 根据网络类型调整资源加载策略
if (networkType === 'wifi') {
  loadHighQualityResources();
} else if (networkType === '4g') {
  loadMediumQualityResources();
} else {
  loadLowQualityResources();
}
``` 