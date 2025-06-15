interface OnboardingModalProps {
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">欢迎使用 Twitter 文案编辑器！</h2>
        <p className="text-gray-600 mb-4 text-sm sm:text-base">
          这款工具帮助你快速创建吸引人的推特文案。以下是主要功能：
        </p>
        <ul className="list-disc pl-5 text-gray-600 mb-6 text-sm sm:text-base">
          <li>格式化：将 Markdown 或纯文本转换为推特支持的格式。</li>
          <li>Emoji 序号：自动为列表添加 🥇🥈 等序号，提升条理性。</li>
          <li>蓝 V 支持：为认证用户提供更高字符限制（400 字符）。</li>
          <li>模板库：选择预设模板快速生成文案。</li>
          <li>实时预览：即时查看推特发布效果。</li>
        </ul>
        <button
          onClick={onClose}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          立即开始
        </button>
      </div>
    </div>
  );
};

export default OnboardingModal;