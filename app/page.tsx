'use client';
import { useState } from 'react';
import Editor from '../components/Editor';
import Preview from '../components/Preview';
import OnboardingModal from '../components/OnboardingModal';
import TemplateSelector from '../components/TemplateSelector';

export default function Home() {
  // 管理文案内容
  const [content, setContent] = useState<string>('');
  // 管理蓝 V 用户状态
  const [isBlueV, setIsBlueV] = useState<boolean>(false);
  // 控制新手引导模态框显示
  const [showOnboarding, setShowOnboarding] = useState<boolean>(true);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-6 text-center">
        Twitter 文案编辑器
      </h1>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg p-6 sm:p-8 flex flex-col gap-6">
        {/* 用户类型选择和模板选择 */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={isBlueV}
              onChange={() => setIsBlueV(!isBlueV)}
              className="w-5 h-5 accent-blue-500 rounded"
            />
            <span className="text-gray-700 text-sm sm:text-base">蓝 V 用户</span>
          </label>
          <TemplateSelector onSelect={(template) => setContent(template)} />
        </div>
        {/* 编辑器和预览并排布局 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Editor content={content} setContent={setContent} isBlueV={isBlueV} />
          <Preview content={content} isBlueV={isBlueV} />
        </div>
      </div>
      {/* 新手引导模态框 */}
      {showOnboarding && <OnboardingModal onClose={() => setShowOnboarding(false)} />}
    </div>
  );
}