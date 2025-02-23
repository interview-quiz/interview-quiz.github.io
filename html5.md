```html

Main Structural Tags

<html> – Root of an HTML document

<head> – Contains metadata

<body> – Main content of the page

<header> – Introductory content

<footer> – Footer section

<main> – Main content of the document

<section> – Thematic grouping of content

<article> – Self-contained content

<aside> – Sidebar content

<nav> – Navigation links

<address> – Contact information


Content Tags

<h1> to <h6> – Headings

<p> – Paragraph

<br> – Line break

<hr> – Thematic break

<pre> – Preformatted text


Text Formatting Tags

<strong> – Important text (bold)

<em> – Emphasized text (italic)

<b> – Bold text (without importance)

<i> – Italic text (without emphasis)

<u> – Underlined text

<small> – Smaller text

<mark> – Highlighted text

<del> – Deleted text

<ins> – Inserted text

<sub> – Subscript

<sup> – Superscript

<blockquote> – Block quote

<cite> – Citation

<q> – Short inline quote

<code> – Inline code

<kbd> – Keyboard input

<samp> – Sample output

<var> – Variable


Lists

<ul> – Unordered list

<ol> – Ordered list

<li> – List item

<dl> – Description list

<dt> – Term in a description list

<dd> – Description of a term


Links & Navigation

<a> – Anchor (hyperlink)

<link> – External resource link


Media Tags

<img> – Image

<audio> – Audio content

<video> – Video content

<source> – Media source

<track> – Subtitles or captions

<figure> – Contains media and caption

<figcaption> – Caption for <figure>


Table Tags

<table> – Table

<tr> – Table row

<th> – Table header cell

<td> – Table data cell

<caption> – Table caption

<thead> – Table head section

<tbody> – Table body section

<tfoot> – Table footer section

<colgroup> – Group of columns

<col> – Column properties


Forms & Input Tags

<form> – Form

<input> – Input field

<textarea> – Multiline text input

<button> – Button

<select> – Dropdown list

<option> – Dropdown option

<optgroup> – Group within <select>

<label> – Label for input

<fieldset> – Group related fields

<legend> – Title for <fieldset>

<datalist> – List of predefined options

<output> – Output from calculations

<progress> – Progress indicator

<meter> – Measurement indicator


Scripting & Metadata

<script> – JavaScript

<noscript> – Fallback when JS is disabled

<style> – CSS

<meta> – Metadata

<title> – Document title

<base> – Base URL for relative links


Interactive Elements

<details> – Expandable content

<summary> – Summary for <details>

<dialog> – Dialog box

<menu> – Menu list

<menuitem> – Menu option (deprecated)


Embedded Content

<iframe> – Inline frame

<embed> – External content

<object> – Embedded object

<param> – Parameters for <object>


Would you like me to explain any of these in more detail?


```

# HTML5 Canvas Guide

## 1. Introduction to `<canvas>`
The `<canvas>` element is used to draw graphics using JavaScript. It's great for creating animations, games, and interactive visualizations.

### Basic Syntax
```html
<canvas id="myCanvas" width="500" height="300"></canvas>
```

## 2. Getting the Canvas Context
To draw on a `<canvas>`, you need to get its rendering context.

```html
<canvas id="myCanvas" width="500" height="300"></canvas>
<script>
  const canvas = document.getElementById("myCanvas");
  const ctx = canvas.getContext("2d"); // Get 2D drawing context
</script>
```

## 3. Drawing Shapes

### Rectangle
```js
ctx.fillStyle = "blue";  
ctx.fillRect(50, 50, 100, 100); // (x, y, width, height)
```

### Line
```js
ctx.beginPath();
ctx.moveTo(50, 50);
ctx.lineTo(200, 200);
ctx.strokeStyle = "red";
ctx.lineWidth = 5;
ctx.stroke();
```

### Circle
```js
ctx.beginPath();
ctx.arc(150, 150, 50, 0, Math.PI * 2);
ctx.fillStyle = "green";
ctx.fill();
```

## 4. Working with Colors & Gradients

### Solid Color
```js
ctx.fillStyle = "orange";
ctx.fillRect(10, 10, 100, 100);
```

### Linear Gradient
```js
const gradient = ctx.createLinearGradient(0, 0, 200, 0);
gradient.addColorStop(0, "red");
gradient.addColorStop(1, "yellow");

ctx.fillStyle = gradient;
ctx.fillRect(10, 10, 200, 100);
```

### Radial Gradient
```js
const radialGradient = ctx.createRadialGradient(100, 100, 10, 100, 100, 50);
radialGradient.addColorStop(0, "blue");
radialGradient.addColorStop(1, "white");

ctx.fillStyle = radialGradient;
ctx.fillRect(50, 50, 200, 200);
```

## 5. Drawing Text
```js
ctx.font = "30px Arial";
ctx.fillStyle = "purple";
ctx.fillText("Hello Canvas", 50, 50);

ctx.strokeStyle = "black";
ctx.strokeText("Outlined Text", 50, 100);
```

## 6. Drawing Images
```js
const img = new Image();
img.src = "your-image.jpg";
img.onload = function () {
  ctx.drawImage(img, 50, 50, 200, 150);
};
```

## 7. Animations
```js
let x = 0;
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "blue";
  ctx.fillRect(x, 50, 50, 50);
  x += 2;
  requestAnimationFrame(animate);
}
animate();
```

## 8. Handling User Interaction
```js
canvas.addEventListener("click", function (event) {
  const x = event.clientX - canvas.offsetLeft;
  const y = event.clientY - canvas.offsetTop;
  ctx.fillStyle = "red";
  ctx.fillRect(x, y, 20, 20);
});
```

## 9. Advanced Topics
- Physics-based animations (e.g., gravity, bouncing balls)
- Drawing complex shapes with Bezier curves
- Creating a game with player movement
- Implementing real-time drawing apps
- Using WebGL for 3D graphics on `<canvas>`
- 

<p>This is a <mark>Formatted: mark tag heighlight background</mark> text</p>
    <p>This is a <em>important: em tag with semantic</em> text</p>
    <p>This is a <i>important: i tag without semantic</i> text</p>

    <progress value="50" max="100">50 percent</progress>

    <nav>
      <a href="/home">Home</a>
      <a href="/about">About</a>
      <a href="/service">Services</a>
      <a href="/contact">Contact</a>
    </nav>

    <select>
      <optgroup label="Asia">
        <option>China</option>
        <option>India</option>
      </optgroup>
      <optgroup label="Europe">
        <option>Netherlands</option>
        <option>France</option>
      </optgroup>
    </select>

    <nav aria-label="breadcrumb">
      <ol>
        <li><a href="/">Home</a></li>
        <li><a href="/products">Products</a></li>
        <li>Electronics</li>
      </ol>
    </nav>
