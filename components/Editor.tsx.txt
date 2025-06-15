'use client';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { formatText, addEmojiNumbers } from '../lib/formatConverter';

interface EditorProps {
  content: string;
  setContent: (content: string) => void;
  isBlueV: boolean;
}

const Editor: React.FC<EditorProps> = ({ content, setContent, isBlueV }) => {
  const [isFormatting, setIsFormatting] = useState(false);
  // 根据用户类型设置字符限制
  const maxLength = isBlueV ? 400 : 280;

  // 处理文本格式化
  const handleFormat = () => {
    setIsFormatting(true);
    try {
      const formatted = formatText(content);
      setContent(formatted);
      toast.success('格式化成功！');
    } catch (error) {
      toast.error('格式化失败，请检查输入。');
    } finally {
      setIsFormatting(false);
    }
  };

  // 添加 Emoji 序号
  const handleAddEmojis = () => {
    const withEmojis = addEmojiNumbers(content);
    setContent(withEmojis);
    toast.success('已添加 Emoji 序号！');
  };

  // 一键复制
  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    toast.success('已复制到剪贴板！');
  };

  // 实时监控字符数
  useEffect(() => {
    if (content.length > maxLength) {
      toast.error(`超出字符限制：${content.length}/${maxLength}`);
    }
  }, [content, maxLength]);

  return (
    <div className="flex flex-col gap-3">
      {/* 字符数显示和操作按钮 */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <span className="text-sm text-gray-500">
          字符数: {content.length}/{maxLength}
        </span>
        <div className="flex flex-wrap gap-2">
          <Tippy content="优化文本格式，去除多余空行并转换 Markdown">
            <button
              onClick={handleFormat}
              disabled={isFormatting}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 transition-colors"
            >
              {isFormatting ? '处理中...' : '格式化'}
            </button>
          </Tippy>
          <Tippy content="为列表项添加 Emoji 序号（如 🥇🥈）">
            <button
              onClick={handleAddEmojis}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
            >
              添加 Emoji
            </button>
          </Tippy>
          <Tippy content="复制格式化后的文案">
            <button
              onClick={handleCopy}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              复制
            </button>
          </Tippy>
        </div>
      </div>
      {/* 文本输入框 */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full h-64 p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white text-gray-800 placeholder-gray-400"
        placeholder="输入或粘贴你的文案（如 Markdown 或纯文本）..."
      />
    </div>
  );
};

export default Editor;