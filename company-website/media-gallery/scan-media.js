const fs = require('fs').promises;
const path = require('path');
const sharp = require('sharp');

// 配置项
const config = {
    sourceDir: 'C:/Users/Lenovo/Documents/WeChat Files/wxid_fweihrcwb19u22/FileStorage/Video/2025-01',
    targetDir: './media-gallery',
    thumbnailSize: { width: 300, height: 169 }, // 16:9 比例
    supportedImageTypes: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
    supportedVideoTypes: ['.mp4', '.webm', '.ogg']
};

// 创建缩略图目录
async function createDirectories() {
    const dirs = [
        path.join(config.targetDir, 'images'),
        path.join(config.targetDir, 'videos'),
        path.join(config.targetDir, 'images/thumbnails'),
        path.join(config.targetDir, 'videos/thumbnails')
    ];

    for (const dir of dirs) {
        await fs.mkdir(dir, { recursive: true });
    }
}

// 生成缩略图
async function generateThumbnail(sourcePath, targetPath) {
    await sharp(sourcePath)
        .resize(config.thumbnailSize.width, config.thumbnailSize.height, {
            fit: 'cover',
            position: 'center'
        })
        .toFile(targetPath);
}

// 获取文件类型
function getFileType(filename) {
    const ext = path.extname(filename).toLowerCase();
    if (config.supportedImageTypes.includes(ext)) {
        return 'image/' + ext.substring(1);
    }
    if (config.supportedVideoTypes.includes(ext)) {
        return 'video/' + ext.substring(1);
    }
    return null;
}

// 扫描媒体文件
async function scanMediaFiles() {
    try {
        // 创建必要的目录
        await createDirectories();

        // 读取源目录
        const files = await fs.readdir(config.sourceDir);
        const mediaFiles = [];

        for (const file of files) {
            const sourcePath = path.join(config.sourceDir, file);
            const stats = await fs.stat(sourcePath);

            if (!stats.isFile()) continue;

            const fileType = getFileType(file);
            if (!fileType) continue;

            const isImage = fileType.startsWith('image/');
            const targetDir = isImage ? 'images' : 'videos';
            const targetPath = path.join(config.targetDir, targetDir, file);
            const thumbnailPath = path.join(config.targetDir, targetDir, 'thumbnails', path.basename(file, path.extname(file)) + '.jpg');

            // 复制原文件
            await fs.copyFile(sourcePath, targetPath);

            // 生成缩略图
            if (isImage) {
                await generateThumbnail(sourcePath, thumbnailPath);
            } else {
                // 对于视频，使用默认的视频缩略图
                await fs.copyFile(
                    path.join(config.targetDir, 'assets', 'video-thumbnail.jpg'),
                    thumbnailPath
                );
            }

            // 添加到媒体文件列表
            mediaFiles.push({
                id: mediaFiles.length + 1,
                name: file,
                type: fileType,
                url: `${targetDir}/${file}`,
                thumbnail: `${targetDir}/thumbnails/${path.basename(file, path.extname(file))}.jpg`,
                size: stats.size,
                date: stats.mtime.toISOString()
            });
        }

        // 保存媒体文件列表
        await fs.writeFile(
            path.join(config.targetDir, 'media-list.json'),
            JSON.stringify({ mediaFiles }, null, 2)
        );

        console.log(`成功处理 ${mediaFiles.length} 个媒体文件`);
    } catch (error) {
        console.error('处理媒体文件时出错:', error);
    }
}

// 运行扫描
scanMediaFiles(); 