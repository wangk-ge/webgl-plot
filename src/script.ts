/**
 * Author Danial Chitnis 2019
 */

import ndarray = require("ndarray");
import { webGLplot} from "./webGLplot"
import { color_rgba} from "./webGLplot"
import { lineGroup } from "./webGLplot"
import * as noUiSlider from 'nouislider';


let canv = <HTMLCanvasElement>document.getElementById("my_canvas");


let devicePixelRatio = window.devicePixelRatio || 1;
let num = Math.round(canv.clientWidth * devicePixelRatio);
//let num=1000;



let line_num = 100;
let line_colors : Array<color_rgba>;
let lines : Array<lineGroup>;

line_colors = [];
lines = [];

for(let i = 0; i < line_num; i++) {
  line_colors.push(new color_rgba(Math.random(), Math.random(), Math.random(), 0.5));
  lines.push(new lineGroup(line_colors[i]));
}

lines.forEach(line => {
  line.xy = ndarray(new Float32Array(num*2), [num, 2]);
});



let wglp = new webGLplot(canv, lines);



console.log(num);

//amplitude
let Samp = 1; 
let Namp = 1;
let freq = 1;
let phi_delta=1;

for (let i=0; i<num; i++) {
  //set x to -num/2:1:+num/2
  lines.forEach(line => {
    line.xy.set(i, 0, 2*i/num-1);
    line.xy.set(i, 1, 0);
  });
}



let phi = 0;




//sliders
let slider_lines = document.getElementById('slider_lines') as noUiSlider.Instance;
let slider_yscale = document.getElementById('slider_yscale') as noUiSlider.Instance;
let slider_new_data = document.getElementById('slider_new_data') as noUiSlider.Instance;
let slider_fps = document.getElementById('slider_fps') as noUiSlider.Instance;

noUiSlider.create(slider_lines, {
   start: [1],
   step: 1,
   connect: [true, false],
   //tooltips: [false, wNumb({decimals: 1}), true],
   range: {
     min: 1,
     max: 10000
   }
});

noUiSlider.create(slider_yscale, {
   start: [1],
   connect: [true, false],
   //tooltips: [false, wNumb({decimals: 1}), true],
   range: {
     min: 0.01,
     max: 1
   }
});

noUiSlider.create(slider_new_data, {
   start: [1],
   step: 1,
   connect: [true, false],
   //tooltips: [false, wNumb({decimals: 1}), true],
   range: {
     min: 0,
     max: 1000
   }
});

noUiSlider.create(slider_fps, {
   start: [1],
   step: 0.1,
   connect: [true, false],
   //tooltips: [false, wNumb({decimals: 1}), true],
   range: {
     min: 0.1,
     max: 1
   }
});


slider_lines.noUiSlider.on("update", function(values, handle) {
   Samp = parseFloat(values[handle]);
   (<HTMLParagraphElement>document.getElementById("display_lines")).innerHTML = Samp.toString();
 });

 slider_yscale.noUiSlider.on("update", function(values, handle) {
   Namp = parseFloat(values[handle]);
   (<HTMLParagraphElement>document.getElementById("display_yscale")).innerHTML = Namp.toString();
 });

 slider_new_data.noUiSlider.on("update", function(values, handle) {
   freq = parseFloat(values[handle]);
   (<HTMLParagraphElement>document.getElementById("display_new_data_size")).innerHTML = freq.toString();
 });

 slider_fps.noUiSlider.on("update", function(values, handle) {
   phi_delta = parseFloat(values[handle]);
   (<HTMLParagraphElement>document.getElementById("display_fps")).innerHTML = phi_delta.toString();
 });





function new_frame() {
  random_walk();
  wglp.update();
  window.requestAnimationFrame(new_frame);
}

window.requestAnimationFrame(new_frame);



function random_walk() {
  for (let i=0; i<num-1; i++) {
    
    lines.forEach(line => {
      line.xy.set(i,1, line.xy.get(i+1,1))
    });
    
  }
  lines.forEach(line => {
    let y = line.xy.get(num-1,1) + 0.01 * (Math.round(Math.random()) -0.5);
    line.xy.set(num-1,1,y);
  });
  
}
