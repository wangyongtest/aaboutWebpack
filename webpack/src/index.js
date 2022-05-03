// @ts-ignore
// 01//  在 inline-loader添加一个 !
// const title= require('-!inline-loader!./title')
// console.log(title)
// // const foo = () => {
// //   console.log('foo是一个箭头函数')
// // }

// // foo()

// console.log('此次仅查看pitch')
import imgSrc from "./imgs/test.jj20.webp"

const domImg = document.createElement("img");

  domImg.setAttribute("scr", imgSrc);
  domImg.width = 320;
  domImg.height = 400;
  document.body.appendChild(domImg);
