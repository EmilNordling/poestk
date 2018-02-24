import React, { Component, Children, isValidElement } from 'react'

let nodeHowClaimedTheScroll = null

class Mostra extends Component {
  state = {
    indexLatest: null,
    // Set to true as soon as the component is swiping.
    // It's the state counter part of this.isSwiping.
    isDragging: false,
    // Help with SSR logic and lazy loading logic.
    isFirstRender: true,
    heightLatest: 0,
    // Let the render method that we are going to display the same slide than previously.
    displaySameSlide: true,
  }

  getChildContext() {
    return {
      swipeableViews: {
        slideUpdateHeight: () => {
          this.updateHeight()
        },
      },
    }
  }

  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  componentWillUnmount() {

  }

  isMoving = undefined

  handleSwipeStart = event => {

  }

  handleScroll = event => {

  }

  updateHeight = () => {
    if (this.activeSlide !== null) {
      const child = this.activeSlide.children[0]
      if (
        child !== undefined &&
        child.offsetHeight !== undefined &&
        this.state.heightLatest !== child.offsetHeight
      ) {
        this.setState({
          heightLatest: child.offsetHeight,
        })
      }
    }
  }

  render() {
    const {
      action,
      animateHeight,
      animateTransitions,
      axis,
      children,
      containerStyle: containerStyleProp,
      disabled,
      disableLazyLoading,
      enableMouseEvents,
      hysteresis,
      ignoreNativeScroll,
      index,
      onChangeIndex,
      onSwitching,
      onTransitionEnd,
      resistance,
      slideStyle: slideStyleProp,
      slideClassName,
      springConfig,
      style,
      threshold,
      ...other
    } = this.props

    const { displaySameSlide, heightLatest, isDragging, isFirstRender, indexLatest } = this.state
    const touchEvents = !disabled
      ? {
          onTouchStart: this.handleTouchStart,
          onTouchEnd: this.handleTouchEnd,
        }
      : {}
    const mouseEvents =
      !disabled && enableMouseEvents
        ? {
            onMouseDown: this.handleMouseDown,
            onMouseUp: this.handleMouseUp,
            onMouseLeave: this.handleMouseLeave,
            onMouseMove: this.handleMouseMove,
          }
        : {}

    // There is no point to animate if we are already providing a height.
    warning(
      !animateHeight || !containerStyleProp || !containerStyleProp.height,
      `react-swipeable-view: You are setting animateHeight to true but you are
also providing a custom height.
The custom height has a higher priority than the animateHeight property.
So animateHeight is most likely having no effect at all.`,
    )

    const slideStyle = Object.assign({}, styles.slide, slideStyleProp)

    let transition
    let WebkitTransition

    if (isDragging || !animateTransitions || displaySameSlide) {
      transition = 'all 0s ease 0s'
      WebkitTransition = 'all 0s ease 0s'
    } else {
      transition = createTransition('transform', springConfig)
      WebkitTransition = createTransition('-webkit-transform', springConfig)

      if (heightLatest !== 0) {
        const additionalTranstion = `, ${createTransition('height', springConfig)}`
        transition += additionalTranstion
        WebkitTransition += additionalTranstion
      }
    }

    const containerStyle = {
      height: null,
      WebkitFlexDirection: axisProperties.flexDirection[axis],
      flexDirection: axisProperties.flexDirection[axis],
      WebkitTransition,
      transition,
    }

    // Apply the styles for SSR considerations
    if (disableLazyLoading || !isFirstRender) {
      const transform = axisProperties.transform[axis](this.indexCurrent * 100)
      containerStyle.WebkitTransform = transform
      containerStyle.transform = transform
    }

    if (animateHeight) {
      containerStyle.height = heightLatest
    }

    return (
      <div
        ref={node => {
          this.rootNode = node
        }}
        style={Object.assign({}, axisProperties.root[axis], style)}
        {...other}
        {...touchEvents}
        {...mouseEvents}
        onScroll={this.handleScroll}
      >
        <div
          ref={node => {
            this.containerNode = node
          }}
          style={Object.assign({}, containerStyle, styles.container, containerStyleProp)}
          className="react-swipeable-view-container"
        >
          {Children.map(children, (child, indexChild) => {
            if (!disableLazyLoading && isFirstRender && indexChild !== indexLatest) {
              return null
            }

            warning(
              isValidElement(child),
              `react-swipeable-view: one of the children provided is invalid: ${child}.
We are expecting a valid React Element`,
            )

            let ref
            let hidden = true

            if (indexChild === indexLatest) {
              hidden = false

              if (animateHeight) {
                ref = node => {
                  this.activeSlide = node
                  this.updateHeight()
                }
                slideStyle.overflowY = 'hidden'
              }
            }

            return (
              <div
                ref={ref}
                style={slideStyle}
                className={slideClassName}
                aria-hidden={hidden}
                data-swipeable="true"
              >
                {child}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Mostra
