/// <reference types="vite/client" />

declare module '*.vue'

declare module '*.svg' {
  const content: any
  export default content
}
