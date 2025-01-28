# 媒体库展示网页

这是一个用于展示图片和视频的响应式网页应用。它可以自动扫描指定文件夹中的媒体文件，生成缩略图，并以网格或列表形式展示。

## 功能特点

- 支持图片（JPG、JPEG、PNG、GIF、WebP）和视频（MP4、WebM、OGG）文件
- 响应式布局，适配各种设备屏幕
- 支持网格视图和列表视图切换
- 支持按文件类型筛选（图片/视频）
- 支持文件名搜索
- 支持媒体文件预览
- 支持键盘快捷键操作
- 自动生成缩略图
- 深色模式支持
- 无障碍支持

## 使用方法

1. 安装依赖：
   ```bash
   npm install
   ```

2. 配置媒体文件源目录：
   - 打开 `scan-media.js`
   - 修改 `config.sourceDir` 为你的媒体文件所在目录

3. 扫描媒体文件：
   ```bash
   npm run scan
   ```

4. 启动本地服务器：
   ```bash
   npm start
   ```

5. 在浏览器中访问：
   ```
   http://localhost:3000/media-gallery
   ```

## 键盘快捷键

- `ESC`: 关闭预览窗口
- `←`: 查看上一个媒体文件
- `→`: 查看下一个媒体文件

## 浏览器支持

- Chrome 最新版
- Firefox 最新版
- Safari 最新版
- Edge 最新版
- Opera 最新版

## 注意事项

1. 首次运行时会自动创建必要的目录结构
2. 图片文件会自动生成缩略图
3. 视频文件将使用默认缩略图
4. 建议定期运行扫描脚本以更新媒体文件列表

## 目录结构

```
media-gallery/
├── css/
│   └── style.css
├── js/
│   └── main.js
├── images/
│   └── thumbnails/
├── videos/
│   └── thumbnails/
├── index.html
├── scan-media.js
├── media-list.json
├── package.json
└── README.md
``` 