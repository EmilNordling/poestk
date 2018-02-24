import GlobalEmitter from './GlobalEmitter'

let isMobile = ('ontouchstart' in document.documentElement)

const touch = {
  start: ['touchstart', 'touchStart'],
  move: ['touchmove', 'touchMove'],
  end: ['touchend', 'touchEnd'],
}

const mouse = {
  start: ['mousedown', 'touchStart'],
  move: ['mousemove', 'touchMove'],
  end: ['mouseup', 'touchEnd'],
}

export default function windowListners(target) {
  target.prototype.createEvents = () => {
    const use = isMobile ? touch : mouse

    Object.keys(use).forEach(value => GlobalEmitter.listen(window, use[value][0], use[value][1]))
  }
}

