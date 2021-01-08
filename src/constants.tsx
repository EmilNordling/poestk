export const IS_MOBILE = !!/mobile|iphone|ipod|android|blackberry|opera|mini|windows\sce|palm|smartphone|iemobile|ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(
  navigator.userAgent,
);

// Specific constant for iOS devices
// http://racase.com.np/javascript-how-to-detect-if-device-is-ios/
export const IS_IOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

export const PADDING = 8;

export const FOCUS_RING_OFFSET = -2;
