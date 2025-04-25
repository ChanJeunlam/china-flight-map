# china-flight-map
china-flight-map

### 中国航线图部署方案

我将帮你创建所有必要的文件，并提供详细的部署步骤，以便将你的中国航线图部署到GitHub Pages。

```typescriptreact project="flight-line-chart"
...
```

## 部署步骤详解

以下是将你的中国航线图部署到GitHub Pages的详细步骤：

### 1. 创建GitHub仓库

1. 登录GitHub，创建一个新的仓库，命名为 `china-flight-map`（或你喜欢的其他名称）
2. 确保仓库是公开的（Public）


### 2. 初始化本地项目

1. 在本地创建项目文件夹：

```shellscript
mkdir china-flight-map
cd china-flight-map
```


2. 初始化Git仓库：

```shellscript
git init
```


3. 将上面生成的所有文件添加到项目中，确保文件结构如下：

```plaintext
china-flight-map/
├── .github/
│   └── workflows/
│       └── deploy.yml
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── .gitignore
├── .nojekyll
├── china.json
├── flight-line-chart.tsx
├── next.config.js
├── package.json
├── tailwind.config.js
└── tsconfig.json
```




### 3. 安装依赖并测试本地运行

1. 安装项目依赖：

```shellscript
npm install --legacy-peer-deps
```


2. 本地运行测试：

```shellscript
npm run dev
```


3. 在浏览器中访问 `http://localhost:3000` 查看效果


### 4. 提交代码到GitHub

1. 添加远程仓库：

```shellscript
git remote add origin https://github.com/你的用户名/china-flight-map.git
```


2. 添加并提交所有文件：

```shellscript
git add .
git commit -m "Initial commit"
```


3. 推送到GitHub：

```shellscript
git push -u origin main
```




### 5. 配置GitHub Actions

1. 确保你的仓库中已经包含了 `.github/workflows/deploy.yml` 文件
2. 这个文件会自动设置GitHub Actions工作流，在你每次推送到main分支时自动构建并部署到GitHub Pages


### 6. 启用GitHub Pages

1. 在GitHub仓库页面，点击 "Settings"
2. 滚动到 "Pages" 部分
3. 在 "Source" 下拉菜单中，选择 "gh-pages" 分支
4. 点击 "Save"


### 7. 等待部署完成

1. 回到仓库主页，点击 "Actions" 标签页查看部署进度
2. 部署完成后，你可以通过 `https://你的用户名.github.io/china-flight-map/` 访问你的项目


### 8. 自定义域名（可选）

如果你有自己的域名，可以在GitHub Pages设置中添加自定义域名。

## 注意事项

1. **仓库名称**：如果你使用了不同的仓库名称，请确保修改 `next.config.js` 中的 `basePath` 和 `assetPrefix` 值。
2. **地图数据**：确保 `china.json` 文件包含完整的中国地图GeoJSON数据。
3. **GitHub Token**：GitHub Actions工作流使用 `GITHUB_TOKEN` 进行部署，这是GitHub自动提供的，你不需要手动设置。
4. **首次部署**：首次部署可能需要几分钟时间，请耐心等待。
5. **调试问题**：如果部署失败，可以在GitHub Actions日志中查看详细错误信息。


现在你的中国航线图应该已经添加了标题，并且可以通过GitHub Pages进行访问了！
