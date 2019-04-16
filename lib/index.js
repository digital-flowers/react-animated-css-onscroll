"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AnimatedOnScroll = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash.throttle");

var _lodash2 = _interopRequireDefault(_lodash);

var _browserOrNode = require("browser-or-node");

var _reactAnimatedCss = require("react-animated-css");

var _propTypes = require("prop-types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var isElementInViewport = function isElementInViewport(el) {
  var offset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  var rect = el.getBoundingClientRect();
  return _browserOrNode.isBrowser ? rect.bottom >= offset && rect.right >= 0 && rect.top <= (window.innerHeight || document.documentElement.clientHeight) - offset && rect.left <= (window.innerWidth || document.documentElement.clientWidth) : false;
};

var onVisibilityChange = function onVisibilityChange(el, offset, callback) {
  var old_visible = void 0;
  return function () {
    var visible = isElementInViewport(el, offset);
    if (visible !== old_visible) {
      old_visible = visible;
      if (typeof callback === 'function') {
        callback(visible);
      }
    }
  };
};

var AnimatedOnScroll = exports.AnimatedOnScroll = function (_React$Component) {
  _inherits(AnimatedOnScroll, _React$Component);

  function AnimatedOnScroll(props) {
    _classCallCheck(this, AnimatedOnScroll);

    var _this = _possibleConstructorReturn(this, (AnimatedOnScroll.__proto__ || Object.getPrototypeOf(AnimatedOnScroll)).call(this, props));

    _this.content = null;

    _this.onVisibilityChange = function (isVisibleNext) {
      var animationOut = _this.props.animationOut;
      var isVisible = _this.state.isVisible;

      if (isVisible && !animationOut) {
        return;
      }
      _this.setState({ isVisible: isVisibleNext });
    };

    _this.state = {
      isVisible: false
    };
    return _this;
  }

  _createClass(AnimatedOnScroll, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      if (_browserOrNode.isBrowser && this.content) {
        var screenOffset = this.props.screenOffset;

        this.handler = (0, _lodash2.default)(onVisibilityChange(this.content, screenOffset, this.onVisibilityChange), 200);
        ['DOMContentLoaded', 'load', 'resize', 'scroll'].forEach(function (e) {
          return window.addEventListener(e, _this2.handler, false);
        });
        this.handler();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var _this3 = this;

      if (_browserOrNode.isBrowser && this.handler) {
        ['DOMContentLoaded', 'load', 'resize', 'scroll'].forEach(function (e) {
          return window.removeEventListener(e, _this3.handler, false);
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ["children"]);

      var isVisible = this.state.isVisible;

      return _react2.default.createElement(
        _reactAnimatedCss.Animated,
        _extends({}, rest, { isVisible: isVisible, innerRef: function innerRef(me) {
            return _this4.content = me;
          },
          style: _extends({ opacity: isVisible ? 1 : 0 }, rest.style) }),
        children
      );
    }
  }]);

  return AnimatedOnScroll;
}(_react2.default.Component);

AnimatedOnScroll.displayName = "AnimatedOnScroll";

AnimatedOnScroll.propTypes = {
  animationIn: _propTypes.string,
  animationOut: _propTypes.string,
  animationInDelay: _propTypes.number,
  animationOutDelay: _propTypes.number,
  animationInDuration: _propTypes.number,
  animationOutDuration: _propTypes.number,
  style: _propTypes.object,
  innerRef: _propTypes.func,
  className: _propTypes.string,
  animateOnMount: _propTypes.bool,
  screenOffset: _propTypes.number
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