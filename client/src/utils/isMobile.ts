export const touch = {
  start: ['touchstart', 'touchStart'],
  move: ['touchmove', 'touchMove'],
  end: ['touchend', 'touchEnd'],
}

export const mouse = {
  start: ['mousedown', 'touchStart'],
  move: ['mousemove', 'touchMove'],
  end: ['mouseup', 'touchEnd'],
}

export const isMobile = ('ontouchstart' in document.documentElement)

// export const isMobile = true
