# [Waiting4<3](https://dacsang97.github.io/waiting-m2love/#/) Project

> A NextJS Project - Waiting for Love

## Tutorial

* English
* [Vietnamese](https://github.com/dacsang97/waiting-m2love/blob/master/HUONGDAN.MD)

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

## Custom your content

1. Music

Change iframe of your music at line 12 in `pages/index.js`

```html
<iframe
  width="0"
  height="0"
  src="https://www.youtube.com/embed/gphA89W5xdQ?autoplay=1&amp;rel=0&amp;controls=0&amp;showinfo=0"
  frameBorder="0"
  allow=""
  allowFullScreen
/>
```

> You MUST set width & height of the iframe to 0.

2. Star content

Update your content in `src/content.js`

```javascript
export default [
  "M2Love",
  ...,
]
```

## Contact

> SangND - [Facebook](https://www.facebook.com/dacsang97) - [Gmail](mailto:dacsang97@gmail.com)
