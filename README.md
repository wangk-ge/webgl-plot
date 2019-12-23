![Build Action](https://github.com/danchitnis/webgl-plot/workflows/Build/badge.svg "")


# webgl-plot
multi-line high-performance 2D graphs using native WebGL. The advantages are:

 * Simple and efficient 2D WebGL interface
 * Using WebGL native line drawing 
 * Using vec2 instead of vec3 to in the vertex shader to decrease the CPU utilization
 * Full control over the color of each line in each frame
 * No dependencies
 * Works on any browser/platfrom that [supports WebGL](https://caniuse.com/#feat=webgl)
 * Ideal for embedded systems with low resources
 

## What are the use cases?
When plotting real-time multiple waveforms are required. For example, software-based oscilloscopes, Arduino, microcontrollers, FPGA user interfaces. This framework also can be used in combination with ElectronJS.

## Limitations
cannot change the line width due to the OpenGL implementation of Line. The OpenGL specification only guarantees a minimum of a single pixel line width. There are other solutions to increase the line width however they substantially increase the size of data vector and take a hit on the performance.

## Why TypeScript?
Because it is much more convenient to maintain and scale up. If you are not familiar with TS, then just use the examples as your template.

## Getting started
See examples at [webgl-plot-examples](https://github.com/danchitnis/webgl-plot-examples)

## How to use with embedded systems applications?
You can use WebUSB, Web Bluetooth, and Serial API. Examples will be provided soon.

## Build
```bash
npm i
npm run build
```

## License
MIT

