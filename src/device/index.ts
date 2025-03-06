/**
 * 设备检测工具模块
 */
import { BrowserInfo, NetworkInfo } from './types';

/**
 * 获取浏览器信息
 */
export function getBrowser(): BrowserInfo {
  const ua = navigator.userAgent;
  let name = 'unknown';
  let version = 'unknown';
  let engine = 'unknown';
  let engineVersion = 'unknown';
  let os = 'unknown';
  let osVersion = 'unknown';
  let device: 'desktop' | 'mobile' | 'tablet' = 'desktop';
  
  // 检测浏览器和版本
  if (/MSIE|Trident/.test(ua)) {
    name = 'Internet Explorer';
    if (/MSIE\s+(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    } else if (/Trident.*rv:(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'Trident';
  } else if (/Edge/.test(ua)) {
    name = 'Edge';
    if (/Edge\/(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'EdgeHTML';
  } else if (/Edg/.test(ua)) {
    name = 'Edge Chromium';
    if (/Edg\/(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'Blink';
  } else if (/Chrome/.test(ua)) {
    name = 'Chrome';
    if (/Chrome\/(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'Blink';
  } else if (/Safari/.test(ua) && !/Chrome/.test(ua)) {
    name = 'Safari';
    if (/Version\/(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'WebKit';
  } else if (/Firefox/.test(ua)) {
    name = 'Firefox';
    if (/Firefox\/(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'Gecko';
  } else if (/Opera/.test(ua)) {
    name = 'Opera';
    if (/Opera\/(\d+\.\d+)/.test(ua) || /Version\/(\d+\.\d+)/.test(ua)) {
      version = RegExp.$1;
    }
    engine = 'Presto';
  }
  
  // 检测引擎版本
  if (/Trident\/(\d+\.\d+)/.test(ua)) {
    engineVersion = RegExp.$1;
  } else if (/AppleWebKit\/(\d+\.\d+)/.test(ua)) {
    engineVersion = RegExp.$1;
    engine = 'WebKit';
  } else if (/Gecko\/(\d+)/.test(ua)) {
    engineVersion = RegExp.$1;
  }
  
  // 检测操作系统
  if (/Windows/.test(ua)) {
    os = 'Windows';
    if (/Windows NT (\d+\.\d+)/.test(ua)) {
      const ntVersion = RegExp.$1;
      switch (ntVersion) {
        case '6.3': osVersion = '8.1'; break;
        case '6.2': osVersion = '8'; break;
        case '6.1': osVersion = '7'; break;
        case '6.0': osVersion = 'Vista'; break;
        case '5.1': osVersion = 'XP'; break;
        case '10.0': osVersion = '10'; break;
        default: osVersion = ntVersion;
      }
    }
  } else if (/Macintosh/.test(ua)) {
    os = 'macOS';
    if (/Mac OS X (\d+[._]\d+)/.test(ua)) {
      osVersion = RegExp.$1.replace('_', '.');
    }
  } else if (/Android/.test(ua)) {
    os = 'Android';
    if (/Android (\d+\.\d+)/.test(ua)) {
      osVersion = RegExp.$1;
    }
  } else if (/iOS|iPhone|iPad|iPod/.test(ua)) {
    os = 'iOS';
    if (/OS (\d+[._]\d+)/.test(ua)) {
      osVersion = RegExp.$1.replace('_', '.');
    }
  } else if (/Linux/.test(ua)) {
    os = 'Linux';
  }
  
  // 检测设备类型
  if (/mobile/i.test(ua)) {
    device = 'mobile';
  } else if (/tablet|ipad/i.test(ua)) {
    device = 'tablet';
  } else {
    device = 'desktop';
  }
  
  return {
    name,
    version,
    engine,
    engineVersion,
    os,
    osVersion,
    device,
    language: navigator.language
  };
}

/**
 * 检测是否为移动设备
 */
export function isMobile(): boolean {
  return /Mobile|Android|iPhone|iPad|iPod|Windows Phone|IEMobile/.test(navigator.userAgent);
}

/**
 * 检测是否为平板设备
 */
export function isTablet(): boolean {
  return /iPad|Android(?!.*Mobile)/.test(navigator.userAgent);
}

/**
 * 获取屏幕方向
 */
export function getOrientation(): 'portrait' | 'landscape' {
  if (window.matchMedia("(orientation: portrait)").matches) {
    return 'portrait';
  }
  return 'landscape';
}

/**
 * 检测是否支持触摸事件
 */
export function isTouchDevice(): boolean {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * 获取网络状态信息
 */
export function getNetworkInfo(): NetworkInfo {
  const connection = (navigator as any).connection || 
                    (navigator as any).mozConnection || 
                    (navigator as any).webkitConnection;
  
  if (!connection) {
    return {
      online: navigator.onLine
    };
  }
  
  return {
    online: navigator.onLine,
    type: connection.type,
    effectiveType: connection.effectiveType
  };
}

/**
 * 检测浏览器是否支持特定功能
 * @param feature 功能名称
 */
export function supports(feature: string): boolean {
  switch (feature.toLowerCase()) {
    case 'webp':
      return testWebP();
    case 'webgl':
      return testWebGL();
    case 'webrtc':
      return testWebRTC();
    case 'serviceworker':
      return 'serviceWorker' in navigator;
    case 'geolocation':
      return 'geolocation' in navigator;
    case 'notifications':
      return 'Notification' in window;
    case 'websocket':
      return 'WebSocket' in window;
    case 'webassembly':
      return 'WebAssembly' in window;
    case 'indexeddb':
      return 'indexedDB' in window;
    case 'localstorage':
      return 'localStorage' in window;
    default:
      return false;
  }
}

// 辅助函数：测试WebP支持
function testWebP(): boolean {
  const canvas = document.createElement('canvas');
  if (!canvas || !canvas.getContext) {
    return false;
  }
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
}

// 辅助函数：测试WebGL支持
function testWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && 
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// 辅助函数：测试WebRTC支持
function testWebRTC(): boolean {
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

/**
 * 获取设备像素比
 */
export function getDevicePixelRatio(): number {
  return window.devicePixelRatio || 1;
} 