interface TemplateSelectorProps {
  onSelect: (template: string) => void;
}

// 定义模板库
const templates = [
  {
    name: '促销',
    content: '🎉 新品上市！限时优惠，速来抢购！\n1. 产品特点\n2. 优惠详情\n3. 下单链接',
  },
  {
    name: '问候',
    content: '☀️ 早安！新的一天，新的开始！\n有什么计划分享吗？',
  },
  {
    name: '公告',
    content: '📢 重要通知！\n我们将于 [日期] 推出新功能，敬请期待！\n详情： [链接]',
  },
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <select
      onChange={(e) => {
        const selected = templates.find((t) => t.name === e.target.value);
        if (selected) onSelect(selected.content);
      }}
      className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
    >
      <option value="">选择模板</option>
      {templates.map((template) => (
        <option key={template.name} value={template.name}>
          {template.name}
        </option>
      ))}
    </select>
  );
};

export default TemplateSelector;