# Hướng dẫn cài đặt

## Yêu cầu

* [NodeJS](https://nodejs.org/en/) ( >= 8.4)
* [Yarn](https://yarnpkg.com/lang/en/)

## Cài đặt

1. Clone hoặc [download](https://github.com/dacsang97/waiting-m2love/archive/master.zip) project về
2. Cài đặt các thư viện cần thiết cho project

```
cd path_to_project (CD vào thư mục chứa project)

yarn (Cài đặt các thư viện cần thiết)
```

3. Chỉnh sửa các nội dung theo ý mình

### Chỉnh sửa nhạc

Thay thế nội dung của thẻ iframe trong `pages/index.js` bằng iframe của bài hát mà bạn muốn chèn

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

> Ví dụ Youtube: https://support.google.com/youtube/answer/171780?hl=vi

### Chỉnh sửa nội dung tin nhắn

Sửa nội dung của file `src/content.js`

```javascript
export default ["M2Love", "I adore you", "..."];
```

> Thay thế `M2Love`, `I adore you`, ... bằng nội dung của bạn.

4. Xuất bản

Sau khi đã chỉnh sửa nội dung và thay nhạc xong, bạn chạy lệnh sau để xuất bản

```
yarn build
```

> Kết quả thu được nằm ở thư mực `docs`

5. Upload lên hosting
   Upload tất cả các file và thư mục trong `docs` lên hosting của bạn.

> Chúc bạn thành công :)
