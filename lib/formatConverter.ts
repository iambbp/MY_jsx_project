// 格式化输入文本，转换为 Twitter 支持的格式
export function formatText(input: string): string {
  // 去除多余空行，保留最多一个空行
  let cleaned = input.trim().replace(/\n{2,}/g, '\n\n');
  
  // 处理 Markdown 列表，转换为 Twitter 友好的符号
  cleaned = cleaned.replace(/^\s*[-*]\s+/gm, '• ');
  
  // 去除 Markdown 标题符号 (#)
  cleaned = cleaned.replace(/^#+/gm, '');

  // 去除行内代码标记
  cleaned = cleaned.replace(/`([^`]+)`/g, '$1');

  // 去除加粗和斜体标记
  cleaned = cleaned.replace(/(\*\*|__)(.*?)\1/g, '$2');
  cleaned = cleaned.replace(/(\*|_)(.*?)\1/g, '$2');

  return cleaned;
}

// 为列表项添加 Emoji 序号
export function addEmojiNumbers(input: string): string {
  const lines = input.split('\n');
  const emojis = ['🥇', '🥈', '🥉', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟'];
  let index = 0;

  const formatted = lines.map((line) => {
    // 仅为非空行且不以数字开头的行添加 Emoji
    if (line.trim() && !line.match(/^\d+\./)) {
      if (index < emojis.length) {
        return `${emojis[index++]} ${line.trim()}`;
      }
    }
    return line;
  });

  return formatted.join('\n');
}