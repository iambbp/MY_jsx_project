import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';

// 加载 Inter 字体，优化排版
const inter = Inter({ subsets: ['latin'] });

// SEO 元数据配置
export const metadata: Metadata = {
  title: 'Twitter 文案编辑器 - 简洁高效的推特内容工具',
  description: '一款简洁大方的推特文案编辑器，支持格式转换、排版优化、Emoji 序号，适合普通用户和蓝 V 用户。',
  keywords: '推特编辑器, Twitter 文案, 格式转换, 排版优化, Emoji 序号, 蓝 V',
  openGraph: {
    title: 'Twitter 文案编辑器',
    description: '快速创建吸引人的推特文案，优化排版，提升互动率。',
    url: 'https://your-domain.vercel.app',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg', // 可选：添加 OG 图片到 public 目录
        width: 1200,
        height: 630,
        alt: 'Twitter 文案编辑器',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter 文案编辑器',
    description: '快速创建吸引人的推特文案，优化排版，提升互动率。',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${inter.className} bg-gray-50 min-h-screen flex flex-col`}>
        {/* 全局通知组件 */}
        <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
        {children}
      </body>
    </html>
  );
}