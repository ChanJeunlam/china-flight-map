/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // 启用静态HTML导出
  distDir: "out", // 输出目录
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, // GitHub Pages不支持Next.js的图像优化
  },
  // 如果你的仓库名不是根域名，需要设置basePath
  // 例如，如果你的仓库名是 'china-flight-map'
  basePath: process.env.NODE_ENV === "production" ? "/china-flight-map" : "",
  // 设置资源文件前缀
  assetPrefix: process.env.NODE_ENV === "production" ? "/china-flight-map/" : "",
  trailingSlash: true, // 添加尾部斜杠，有助于GitHub Pages的路由
}

module.exports = nextConfig
