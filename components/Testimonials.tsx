import { Quote, User } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      name: '林小雨',
      role: '视觉设计专业学生',
      content: '作为设计专业学生，这个工具帮我快速生成了毕业设计所需的VI方案，配色和字体推荐都非常专业，节省了我大量时间。',
    },
    {
      name: '张晓明',
      role: '市场经理',
      content: '公司新产品线急需VI设计，但我们没有设计团队。这个工具让我在半天内就完成了整套方案，老板非常满意！',
    },
    {
      name: '陈思远',
      role: '资深品牌设计师',
      content: '以前做VI设计需要从零开始构思，现在用这个工具作为灵感起点，效率提升了好几倍，让我能承接更多项目。',
    },
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            用户怎么说
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            来自不同背景用户的真实反馈
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div key={item.name} className="card relative">
              <Quote className="absolute top-4 right-4 w-10 h-10 text-gray-100" />
              <div className="w-14 h-14 bg-gradient-to-br from-brand-100 to-primary-100 rounded-full flex items-center justify-center mb-4">
                <User className="w-7 h-7 text-brand-600" />
              </div>
              <p className="text-gray-600 mb-6">{item.content}</p>
              <div>
                <div className="font-semibold text-gray-900">{item.name}</div>
                <div className="text-sm text-gray-500">{item.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
