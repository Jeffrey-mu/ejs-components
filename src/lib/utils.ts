import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function copyText(text: string) {
  // 创建一个临时的 textarea 元素
  const textarea = document.createElement('textarea')
  // 将文本内容设置为参数传入的字符串
  textarea.value = text
  // 将 textarea 元素设置为不可见
  textarea.style.position = 'absolute'
  textarea.style.left = '-9999px'
  // 将 textarea 元素添加到页面中
  document.body.appendChild(textarea)
  // 选中 textarea 元素中的文本
  textarea.select()
  // 将文本复制到剪贴板
  document.execCommand('copy')
  // 移除 textarea 元素
  document.body.removeChild(textarea)
}
