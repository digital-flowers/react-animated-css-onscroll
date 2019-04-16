import React from "react";
import throttle from "lodash.throttle";
import {isBrowser} from "browser-or-node";
import {Animated} from "react-animated-css";
import {bool, func, number, object, string} from "prop-types";

/**
 * check element screen visibility, see: https://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
 * @param el
 * @param offset
 * @return {boolean}
 */
const isElementInViewport = (el, offset = 0) => {
  const rect = el.getBoundingClientRect();
  return isBrowser ? (
    rect.bottom >= offset &&
    rect.right >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset && /*or $(window).height() */
    rect.left <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
  ) : false;
};

/**
 * on element visibility change
 * @param el
 * @param offset
 * @param callback
 * @return {function()}
 */
const onVisibilityChange = (el, offset, callback) => {
  let old_visible;
  return () => {
    const visible = isElementInViewport(el, offset);
    if (visible !== old_visible) {
      old_visible = visible;
      if (typeof callback === 'function') {
        callback(visible);
      }
    }
  }
};

/**
 * Animated on Scroll
 */
export class AnimatedOnScroll extends React.Component {
  content = null;
  handler;

  constructor(props) {
    super(props);
    this.state = {
      isVisible: false
    };
  }

  componentDidMount() {
    if (isBrowser && this.content) {
      const {screenOffset} = this.props;
      this.handler = throttle(onVisibilityChange(this.content, screenOffset, this.onVisibilityChange), 200);
      ['DOMContentLoaded', 'load', 'resize', 'scroll'].forEach(e => window.addEventListener(e, this.handler, false));
      this.handler();
    }
  };

  componentWillUnmount() {
    if (isBrowser && this.handler) {
      ['DOMContentLoaded', 'load', 'resize', 'scroll'].forEach(e => window.removeEventListener(e, this.handler, false));
    }
  }

  onVisibilityChange = isVisibleNext => {
    const {animationOut} = this.props;
    const {isVisible} = this.state;
    // if no animation out make the animation once :)
    if (isVisible && !animationOut) {
      return;
    }
    this.setState({isVisible: isVisibleNext})
  };

  render() {
    const {children, ...rest} = this.props;
    const {isVisible} = this.state;
    return (
      <Animated {...rest} isVisible={isVisible} innerRef={me => this.content = me}
                style={{opacity: isVisible ? 1 : 0, ...rest.style}}>
        {children}
      </Animated>
    );
  }

}

AnimatedOnScroll.displayName = "AnimatedOnScroll";

AnimatedOnScroll.propTypes = {
  animationIn: string,
  animationOut: string,
  animationInDelay: number,
  animationOutDelay: number,
  animationInDuration: number,
  animationOutDuration: number,
  style: object,
  innerRef: func,
  className: string,
  animateOnMount: bool,
  screenOffset: number
};

AnimatedOnScroll.defaultProps = {
  animationIn: "fadeIn",
  animationOut: "",
  className: "",
  animationInDelay: 0,
  animationOutDelay: 0,
  animationInDuration: 1000,
  animationOutDuration: 1000,
  animateOnMount: true,
  screenOffset: 50,
  style: {}
};
