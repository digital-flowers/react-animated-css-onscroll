# react-animate-css-onscroll
React component to show or hide elements with animations when they are visible to the screen using [Animated.css](https://daneden.github.io/animate.css/)

[![npm version](https://img.shields.io/npm/v/react-animated-css-onscroll.svg?style=flat-square)](https://www.npmjs.com/package/react-animated-css-onscroll)
[![npm downloads](https://img.shields.io/npm/dt/react-animated-css-onscroll.svg?style=flat-square)](https://www.npmjs.com/package/react-animated-css-onscroll)

## demo
https://digital-flowers.github.io/react-animated-css-onscroll.html

## install

```bash
npm i react-animated-css-onscroll --save
```
**Note** You have to include [Animated.css](https://daneden.github.io/animate.css/) in your html page, this component is just a wrapper for it.

```html
<head>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css">
</head>
```

## how to use
very easy to use, just wrap your content with the AnimatedOnScroll component
```javascript
import {AnimatedOnScroll} from "react-animated-css-onscroll";

<AnimatedOnScroll animationIn="bounceInLeft" animationOut="fadeOut">
    <div>
        hello world ;)
    </div>
</AnimatedOnScroll>

```

### Properties

- **animationIn** animation in name, default "fadeIn"
- **animationOut** animation out name, default "fadeOut"
- **animationInDelay** animation in delay, default 0
- **animationOutDelay** animation out delay, default 0
- **animationInDuration** animation in duration, default 1000
- **animationOutDuration** animation out duration, default 1000
- **style** react style property for the inner component
- **innerRef** react ref property for the inner component
- **className** react className property for the inner component
- **animateOnMount** apply animationIn on mount or not, default true
- **screenOffset** screen margin where the element considered visible if entered, default 50

### List of animation
All the following animation from animated.css are supported.

| ﻿Animation Name |
|--------------------|
| `bounce` |
| `flash` |
| `pulse` |
| `rubberBand` |
| `shake` |
| `headShake` |
| `swing` |
| `tada` |
| `wobble` |
| `jello` |
| `bounceIn` |
| `bounceInDown` |
| `bounceInLeft` |
| `bounceInRight` |
| `bounceInUp` |
| `bounceOut` |
| `bounceOutDown` |
| `bounceOutLeft` |
| `bounceOutRight` |
| `bounceOutUp` |
| `fadeIn` |
| `fadeInDown` |
| `fadeInDownBig` |
| `fadeInLeft` |
| `fadeInLeftBig` |
| `fadeInRight` |
| `fadeInRightBig` |
| `fadeInUp` |
| `fadeInUpBig` |
| `fadeOut` |
| `fadeOutDown` |
| `fadeOutDownBig` |
| `fadeOutLeft` |
| `fadeOutLeftBig` |
| `fadeOutRight` |
| `fadeOutRightBig` |
| `fadeOutUp` |
| `fadeOutUpBig` |
| `flipInX` |
| `flipInY` |
| `flipOutX` |
| `flipOutY` |
| `lightSpeedIn` |
| `lightSpeedOut` |
| `rotateIn` |
| `rotateInDownLeft` |
| `rotateInDownRight` |
| `rotateInUpLeft` |
| `rotateInUpRight` |
| `rotateOut` |
| `rotateOutDownLeft` |
| `rotateOutDownRight` |
| `rotateOutUpLeft` |
| `rotateOutUpRight` |
| `hinge` |
| `jackInTheBox` |
| `rollIn` |
| `rollOut` |
| `zoomIn` |
| `zoomInDown` |
| `zoomInLeft` |
| `zoomInRight` |
| `zoomInUp` |
| `zoomOut` |
| `zoomOutDown` |
| `zoomOutLeft` |
| `zoomOutRight` |
| `zoomOutUp` |
| `slideInDown` |
| `slideInLeft` |
| `slideInRight` |
| `slideInUp` |
| `slideOutDown` |
| `slideOutLeft` |
| `slideOutRight` |
| `slideOutUp` |
