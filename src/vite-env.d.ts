/// <reference types="vite/client" />
declare module "*.tsx"
declare module "*.ts" 

declare module '*.png'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.scss'
declare module '*.js'
declare module '*.vue'
declare module '*.jsx'

declare namespace NodeJS {
  type Timer = any;
  type Timeout = any;
}

declare module '@/server/axios' {
  // 在这里写入模块的导出类型
}
declare module '@/plugins/website' {
  // 在这里添加模块的类型声明
}
