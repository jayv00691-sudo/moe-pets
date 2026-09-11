# 照片放这里 📷

每个子目录对应一只小动物，目录名 = 该角色详情页里的「**图片目录名**」字段。

```
images/
├── tuantuan/    团团
├── taotao/      桃桃
├── qiuqiu/      球球
├── daidai/      呆呆
├── tunuonuo/    兔糯糯
└── xiaoguai/    灰小乖
```

## 怎么用

1. 把照片直接丢进对应文件夹（支持 jpg / png / gif / webp / avif / svg）
2. `git add . && git commit && git push`
3. GitHub Action 会自动重建 `manifest.json` 并部署，刷新网页照片就出现了

想用中文目录名也可以：在网页详情里把「图片目录名」改成 `团团`，同时把文件夹改名成 `images/团团/` 就行。

## 本地预览

网页通过 `images/manifest.json` 读取照片列表，本地需要先生成它：

```bash
node scripts/gen-manifest.mjs
```

直接用 `file://` 双击打开也能看，但读不到 manifest（浏览器限制），此时可以在详情页手动添加图片路径。
建议本地起个静态服务器：`npx serve .` 或 `python -m http.server`。
