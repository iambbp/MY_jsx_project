import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Textarea } from '@/components/ui/textarea.jsx'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { Separator } from '@/components/ui/separator.jsx'
import { 
  Twitter, 
  Hash, 
  Link, 
  Eye, 
  Save, 
  Sparkles, 
  Type, 
  Image,
  MessageSquare,
  RotateCcw,
  Copy,
  CheckCircle,
  AlertCircle,
  BookOpen,
  Plus,
  X,
  Camera,
  Video,
  FileText
} from 'lucide-react'
import './App.css'

function App() {
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [charCount, setCharCount] = useState(0)
  const [isTwitterBlue, setIsTwitterBlue] = useState(false)
  const [savedDrafts, setSavedDrafts] = useState([])
  const [copySuccess, setCopySuccess] = useState(false)
  const [templates, setTemplates] = useState([])
  const [showTemplates, setShowTemplates] = useState(false)
  const [newTemplate, setNewTemplate] = useState({ name: '', content: '' })
  const [showAddTemplate, setShowAddTemplate] = useState(false)

  const maxChars = isTwitterBlue ? 10000 : 280

  // 预设模板
  const defaultTemplates = [
    {
      id: 1,
      name: '技术分享',
      content: '今天学到了一个新技术：\n\n[技术名称]\n\n主要特点：\n• [特点1]\n• [特点2]\n• [特点3]\n\n推荐给正在学习的朋友们！'
    },
    {
      id: 2,
      name: '读书笔记',
      content: '📚 读书分享\n\n书名：《[书名]》\n作者：[作者]\n\n核心观点：\n💡 [观点1]\n💡 [观点2]\n💡 [观点3]\n\n值得一读！'
    },
    {
      id: 3,
      name: '项目展示',
      content: '🚀 项目分享\n\n项目名称：[项目名]\n\n主要功能：\n✨ [功能1]\n✨ [功能2]\n✨ [功能3]\n\n技术栈：[技术栈]\n\n欢迎大家体验和反馈！'
    },
    {
      id: 4,
      name: '学习总结',
      content: '📝 本周学习总结\n\n学习内容：\n1️⃣ [内容1]\n2️⃣ [内容2]\n3️⃣ [内容3]\n\n收获：\n[收获描述]\n\n下周计划：\n[计划内容]'
    }
  ]

  useEffect(() => {
    setCharCount(inputText.length)
  }, [inputText])

  // 格式转换功能 - 清理文本格式
  const formatText = () => {
    let formatted = inputText
    
    // 清理多余空行（超过2个连续换行符）
    formatted = formatted.replace(/\n{3,}/g, '\n\n')
    
    // 清理行首行尾空格
    formatted = formatted.split('\n').map(line => line.trim()).join('\n')
    
    // 处理全角/半角字符
    formatted = formatted.replace(/，/g, ', ')
                      .replace(/。/g, '. ')
                      .replace(/！/g, '! ')
                      .replace(/？/g, '? ')
                      .replace(/：/g, ': ')
                      .replace(/；/g, '; ')
    
    // 自动识别并格式化链接
    formatted = formatted.replace(/(https?:\/\/[^\s]+)/g, '$1')
    
    // 清理多余空格
    formatted = formatted.replace(/\s+/g, ' ')
    
    setOutputText(formatted.trim())
  }

  // 添加数字序号
  const addEmojiNumbers = () => {
    const lines = inputText.split('\n').filter(line => line.trim())
    const emojiNumbers = ['1️⃣', '2️⃣', '3️⃣', '4️⃣', '5️⃣', '6️⃣', '7️⃣', '8️⃣', '9️⃣', '🔟']
    
    let formatted = ''
    let numberIndex = 0
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.match(/^[1-9]️⃣/)) {
        if (numberIndex < emojiNumbers.length) {
          formatted += emojiNumbers[numberIndex] + ' ' + trimmedLine
          numberIndex++
        } else {
          formatted += '• ' + trimmedLine
        }
      } else {
        formatted += trimmedLine
      }
      
      if (index < lines.length - 1) {
        formatted += '\n\n'
      }
    })
    
    setOutputText(formatted)
  }

  // 添加亮点标记
  const addSparklePoints = () => {
    const lines = inputText.split('\n').filter(line => line.trim())
    const sparkleEmojis = ['✨', '💡', '🌟', '⭐', '🔥', '💫', '🎯', '📌']
    
    let formatted = ''
    let emojiIndex = 0
    
    lines.forEach((line, index) => {
      const trimmedLine = line.trim()
      if (trimmedLine && !trimmedLine.match(/^[✨💡🌟⭐🔥💫🎯📌]/)) {
        if (emojiIndex < sparkleEmojis.length) {
          formatted += sparkleEmojis[emojiIndex] + ' ' + trimmedLine
          emojiIndex++
        } else {
          formatted += '• ' + trimmedLine
        }
      } else {
        formatted += trimmedLine
      }
      
      if (index < lines.length - 1) {
        formatted += '\n\n'
      }
    })
    
    setOutputText(formatted)
  }

  // 添加话题标签建议
  const addHashtags = () => {
    let formatted = outputText || inputText
    
    // 常见编程相关话题标签
    const programmingKeywords = {
      '编程': '#编程',
      '开发': '#开发',
      '前端': '#前端开发',
      '后端': '#后端开发',
      'JavaScript': '#JavaScript',
      'React': '#React',
      'Vue': '#Vue',
      'Python': '#Python',
      '算法': '#算法',
      '数据结构': '#数据结构',
      '机器学习': '#机器学习',
      'AI': '#人工智能',
      '技术': '#技术分享',
      '学习': '#学习笔记'
    }
    
    // 检查文本中的关键词并添加相应标签
    const suggestedTags = []
    Object.keys(programmingKeywords).forEach(keyword => {
      if (formatted.includes(keyword) && !formatted.includes(programmingKeywords[keyword])) {
        suggestedTags.push(programmingKeywords[keyword])
      }
    })
    
    if (suggestedTags.length > 0) {
      formatted += '\n\n' + suggestedTags.slice(0, 3).join(' ')
    }
    
    setOutputText(formatted)
  }

  // 保存草稿
  const saveDraft = () => {
    const draft = {
      id: Date.now(),
      content: inputText,
      timestamp: new Date().toLocaleString('zh-CN')
    }
    const newDrafts = [draft, ...savedDrafts.slice(0, 4)] // 保留最新5个草稿
    setSavedDrafts(newDrafts)
    
    // 保存到本地存储
    localStorage.setItem('twitterEditorDrafts', JSON.stringify(newDrafts))
  }

  // 加载草稿
  const loadDraft = (content) => {
    setInputText(content)
    setOutputText('')
  }

  // 加载模板
  const loadTemplate = (content) => {
    setInputText(content)
    setOutputText('')
    setShowTemplates(false)
  }

  // 添加新模板
  const addTemplate = () => {
    if (newTemplate.name && newTemplate.content) {
      const template = {
        id: Date.now(),
        name: newTemplate.name,
        content: newTemplate.content
      }
      const newTemplates = [...templates, template]
      setTemplates(newTemplates)
      localStorage.setItem('twitterEditorTemplates', JSON.stringify(newTemplates))
      setNewTemplate({ name: '', content: '' })
      setShowAddTemplate(false)
    }
  }

  // 删除模板
  const deleteTemplate = (id) => {
    const newTemplates = templates.filter(t => t.id !== id)
    setTemplates(newTemplates)
    localStorage.setItem('twitterEditorTemplates', JSON.stringify(newTemplates))
  }

  // 清空所有内容
  const clearAll = () => {
    setInputText('')
    setOutputText('')
  }

  // 复制到剪贴板
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText || inputText)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('复制失败:', err)
    }
  }

  // 从本地存储加载草稿和模板
  useEffect(() => {
    const savedDraftsData = localStorage.getItem('twitterEditorDrafts')
    if (savedDraftsData) {
      setSavedDrafts(JSON.parse(savedDraftsData))
    }

    const savedTemplatesData = localStorage.getItem('twitterEditorTemplates')
    if (savedTemplatesData) {
      setTemplates(JSON.parse(savedTemplatesData))
    } else {
      setTemplates(defaultTemplates)
    }
  }, [])

  // 获取字符数状态
  const getCharCountStatus = () => {
    if (charCount > maxChars) return 'destructive'
    if (charCount > maxChars * 0.9) return 'warning'
    return 'secondary'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* 头部 */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Twitter className="w-8 h-8 text-blue-500" />
            <h1 className="text-3xl font-bold text-gray-800">推特文案编辑器</h1>
          </div>
          <p className="text-gray-600">让你的推文更有条理、更吸引人</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 输入区域 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Type className="w-5 h-5" />
                输入文本
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="在这里输入你的推文内容..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="min-h-[300px] resize-none"
              />
              
              {/* 字数统计 */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={getCharCountStatus()}>
                    {charCount}/{maxChars}
                  </Badge>
                  {charCount > maxChars && (
                    <div className="flex items-center gap-1 text-red-500">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">超出字符限制</span>
                    </div>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsTwitterBlue(!isTwitterBlue)}
                  >
                    {isTwitterBlue ? 'Twitter Blue' : '普通用户'}
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setShowTemplates(!showTemplates)}
                  >
                    <BookOpen className="w-4 h-4 mr-1" />
                    模板
                  </Button>
                  <Button variant="outline" size="sm" onClick={clearAll}>
                    <RotateCcw className="w-4 h-4 mr-1" />
                    清空
                  </Button>
                </div>
              </div>

              {/* 功能按钮 */}
              <div className="grid grid-cols-2 gap-2">
                <Button onClick={formatText} variant="outline">
                  <Sparkles className="w-4 h-4 mr-2" />
                  格式化
                </Button>
                <Button onClick={addEmojiNumbers} variant="outline">
                  1️⃣ 数字序号
                </Button>
                <Button onClick={addSparklePoints} variant="outline">
                  ✨ 亮点标记
                </Button>
                <Button onClick={addHashtags} variant="outline">
                  <Hash className="w-4 h-4 mr-2" />
                  添加标签
                </Button>
                <Button onClick={saveDraft} variant="outline" className="col-span-2">
                  <Save className="w-4 h-4 mr-2" />
                  保存草稿
                </Button>
              </div>

              {/* 模板选择器 */}
              {showTemplates && (
                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">选择模板</CardTitle>
                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setShowAddTemplate(true)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          添加
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost"
                          onClick={() => setShowTemplates(false)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-1 gap-2">
                      {templates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-2 bg-white rounded border">
                          <span className="text-sm font-medium">{template.name}</span>
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => loadTemplate(template.content)}
                            >
                              使用
                            </Button>
                            {template.id > 4 && (
                              <Button 
                                size="sm" 
                                variant="ghost"
                                onClick={() => deleteTemplate(template.id)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* 添加模板 */}
              {showAddTemplate && (
                <Card className="border-green-200 bg-green-50">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm">添加新模板</CardTitle>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => setShowAddTemplate(false)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 space-y-3">
                    <input
                      type="text"
                      placeholder="模板名称"
                      value={newTemplate.name}
                      onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                      className="w-full p-2 border rounded text-sm"
                    />
                    <Textarea
                      placeholder="模板内容"
                      value={newTemplate.content}
                      onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                      className="min-h-[100px] text-sm"
                    />
                    <Button onClick={addTemplate} size="sm" className="w-full">
                      保存模板
                    </Button>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>

          {/* 输出区域 */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                预览效果
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* 推文预览 */}
              <div className="bg-white border rounded-lg p-4 min-h-[300px]">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <Twitter className="w-5 h-5 text-blue-500" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">你的用户名</span>
                      <span className="text-gray-500">@username</span>
                      <span className="text-gray-500">·</span>
                      <span className="text-gray-500">现在</span>
                    </div>
                    <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                      {outputText || inputText || '在左侧输入内容，这里会显示预览效果...'}
                    </div>
                    <div className="flex items-center gap-4 mt-3 text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                      <span>💬</span>
                      <span>🔄</span>
                      <span>❤️</span>
                      <span>📊</span>
                      <span>🔗</span>
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={copyToClipboard} className="w-full">
                {copySuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    已复制到剪贴板
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    复制到剪贴板
                  </>
                )}
              </Button>

              {/* 多媒体附件提醒 */}
              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs">💡</span>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold text-yellow-800 mb-2">增强推文效果</p>
                      <div className="space-y-1 text-yellow-700">
                        <div className="flex items-center gap-2">
                          <Camera className="w-4 h-4" />
                          <span>添加图片可以增加视觉吸引力</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Video className="w-4 h-4" />
                          <span>视频内容通常获得更多互动</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <span>投票功能可以增加用户参与度</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </div>

        {/* 草稿区域 */}
        {savedDrafts.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Save className="w-5 h-5" />
                保存的草稿
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {savedDrafts.map((draft) => (
                  <div key={draft.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-sm text-gray-800 truncate">
                        {draft.content.substring(0, 50)}...
                      </p>
                      <p className="text-xs text-gray-500">{draft.timestamp}</p>
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => loadDraft(draft.content)}
                    >
                      加载
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* 功能说明 */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>功能说明</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  格式化
                </h4>
                <p className="text-gray-600">清理多余空行，优化文本排版，处理标点符号</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">1️⃣ 数字序号</h4>
                <p className="text-gray-600">为每行内容添加数字emoji序号，让内容更有条理</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✨ 亮点标记</h4>
                <p className="text-gray-600">用各种emoji标记重点内容，增加视觉吸引力</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Hash className="w-4 h-4" />
                  添加标签
                </h4>
                <p className="text-gray-600">智能识别内容并建议相关话题标签</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  模板功能
                </h4>
                <p className="text-gray-600">使用预设模板快速创建内容，支持自定义模板</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  草稿保存
                </h4>
                <p className="text-gray-600">保存和加载草稿，防止内容丢失</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 使用提示 */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-2">使用小贴士：</p>
                <ul className="space-y-1 text-blue-700">
                  <li>• 先输入内容，再使用格式化功能优化排版</li>
                  <li>• 数字序号和亮点标记会自动处理空行和重复标记</li>
                  <li>• 添加标签功能会根据内容智能推荐相关话题</li>
                  <li>• 使用模板功能可以快速创建结构化内容</li>
                  <li>• 草稿和模板会自动保存到本地，刷新页面不会丢失</li>
                  <li>• 字符统计支持普通用户(280字符)和Twitter Blue用户(10000字符)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App

