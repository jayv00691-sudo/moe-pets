#!/usr/bin/env node
/**
 * 扫描 images/<角色目录>/ 下的图片，生成 images/manifest.json。
 * 页面会读取这个清单，自动把照片显示到对应角色的图像库里。
 *
 * 用法：node scripts/gen-manifest.mjs
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const IMG_DIR = path.join(ROOT, 'images');
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.avif', '.bmp', '.svg']);
const IGNORE = new Set(['.gitkeep', 'manifest.json', '.ds_store']);

// 自然排序：img2 排在 img10 前面
const natural = (a, b) => a.localeCompare(b, 'zh', { numeric: true, sensitivity: 'base' });

if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
  console.log('images/ 不存在，已创建空目录');
}

const manifest = {};
for (const entry of fs.readdirSync(IMG_DIR, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const dirName = entry.name;
  const files = fs
    .readdirSync(path.join(IMG_DIR, dirName))
    .filter(f => !IGNORE.has(f.toLowerCase()))
    .filter(f => EXTS.has(path.extname(f).toLowerCase()))
    .sort(natural);

  if (files.length) {
    manifest[dirName] = files.map(f => `images/${dirName}/${f}`);
  }
}

fs.writeFileSync(
  path.join(IMG_DIR, 'manifest.json'),
  JSON.stringify(manifest, null, 2) + '\n',
  'utf8'
);

const summary = Object.entries(manifest).map(([k, v]) => `${k}(${v.length})`);
console.log('已生成 images/manifest.json →', summary.length ? summary.join(', ') : '（暂无图片）');
