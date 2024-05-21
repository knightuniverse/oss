This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Background knowledge

**代码仓库地址**

https://bitbucket.org/logisticsteam-dev/item-partner-web/src/main/

**开发流程**

1. 代码分支从 release 分支切分出来
1. 一个功能点一个功能点单独发布

**测试流程**

1. 测试环境是 staging 分支，所以想要部署到测试环境的话，提交 PR，Developer 自己合并到 staging 分支即可，然后到 Jenkins 手动构建

**发布流程**

1. 代码提交 PR 合并到 release 分支，由 Seven 进行合并&部署

**技术选型**

1. 基础框架是[Next.js](https://nextjs.org/)
1. CSS框架依然是[tailwindcss](https://tailwindcss.com/docs/utility-first)
1. UI 组件选择了[shadcn/ui](https://ui.shadcn.com/docs)
1. 数据校验（可与 React Form 进行配合，也可以单独对 JS 对象进行校验）选择了[Zod](https://zod.dev/?id=installation)
1. 日期处理的函数库不再是 dayjs，选择了 date-fns

**技术选型的考虑**

这个项目主要针对的是 C 端用户，因此有个需要考虑的非功能性因素就是，性能。传统的前后端分离设计，比如 React, Vue，会有一些比较大的缺点：

1. 首次渲染，白屏时间过长；由于所有 JS（包括第三方依赖）都打包在一个文件中，在这个 JS 加载完成之前，在页面上是看不到任何东西，这就会让用户感受到‘白屏’
2. 对于搜索引擎来说，只能在页面中发现一个 DOM 节点，不利于 SEO；因为搜索引擎是不支持执行 JavaScript 代码的。

SSR 可以解决以上问题，带来更好的性能和体验。SSR 方案中，最成熟的就是 Next.js。

更多的可以参考[理解 Next.js 中的 CSR、SSR、SSG、ISR 以及 Streaming](https://juejin.cn/post/7162775935828115469)

**UI Theme**

本项目的 UI 组件使用[shadcn/ui](https://ui.shadcn.com/docs)，默认使用dark模式。UI的颜色变量位于`src/app/globals.css`这个文件的`.dark`类下。

**PWA**

项目的需求[CRM-1612](https://jira.logisticsteam.com/browse/CRM-1612)有提到一点：

1. Preferrably PWA

[手把手教你使用Next.js实现一个PWA应用](https://cloud.tencent.com/developer/article/2369553)

**DEV TOOLS**

1. [Another Redis Desktop Manager](https://goanother.com/cn/)
1. [DBeaver](https://dbeaver.io/)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
