# vite-plugin-inline-style-px-to-rem
vite plugin that handles inline style in react and converts px to rem

处理所有的样式属性值（如 width, height, padding, margin 等）并将所有 px 值自动转换为 rem

# 安装依赖：
  确保已安装相关依赖：
```bash
npm install @babel/core @babel/plugin-syntax-jsx --save-dev
```

# 在 vite.config.js 中集成插件：
```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginInlineStylePxToRem from './vite-plugin-inline-style-px-to-rem';

export default defineConfig({
  plugins: [
    react(),
    vitePluginInlineStylePxToRem({ rootValue: 16, unitPrecision: 3 }), // 自定义 rootValue 和 unitPrecision
  ],
});
```

# 使用示例
输入代码：
```jsx
const MyComponent = () => {
  return (
    <div style={{ width: 100, height: '200px', padding: '20px', marginTop: 30 }}>
      Hello World
    </div>
  );
};
```

转换后的结果：
```jsx
const MyComponent = () => {
  return (
    <div style={{ width: '6.25rem', height: '12.5rem', padding: '1.25rem', marginTop: '1.875rem' }}>
      Hello World
    </div>
  );
};
```

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
