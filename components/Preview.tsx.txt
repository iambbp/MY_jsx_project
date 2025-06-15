interface PreviewProps {
  content: string;
  isBlueV: boolean;
}

const Preview: React.FC<PreviewProps> = ({ content, isBlueV }) => {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-gray-700">实时预览</h3>
      <div className="w-full h-64 p-4 border border-gray-200 rounded-lg bg-gray-50 overflow-y-auto">
        {/* 模拟 Twitter 用户头像和名称 */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-blue-500 rounded-full" />
          <span className="font-bold text-gray-800">
            用户名称 {isBlueV && '✅'}
          </span>
        </div>
        {/* 文案预览 */}
        <p className="text-gray-800 whitespace-pre-wrap text-sm sm:text-base">
          {content || '预览内容将显示在这里...'}
        </p>
      </div>
    </div>
  );
};

export default Preview;