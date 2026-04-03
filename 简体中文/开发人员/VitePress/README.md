# VitePress帮助手册
 
## 本地开发
1. 安装库 `npm add -D vitepress`。
2. 初始化项目 `npx vitepress init`。根据向导配置相关项。

## 部署到Github Pages

1. 进入Github 项目,点击【Settings】按钮进入【GitHub Pages】,将【Build and deployment】下的【source】设置为【Github Actions】。
2. 点击导航栏【Actions】按钮。进入【Actions】页面并点击左侧的【New workflow】按钮。
3. 点击上侧【set up a workflow yourself 】链接，进入工作流编辑页面。
4. 在工作流编辑页面，将main.yml文件重命名为deploy.yml，写入[内容](deploy.yml)并保存。<br>
    **注意**<br>
    在deploy.yml中进行配置，让Jekyll不处理这个站点,否则页面会没有样式<br>
    ```    
       - name: Build with VitePress
         run: |
             npm run docs:build # or pnpm docs:build / yarn docs:build / bun run docs:build
             touch .nojekyll # 通知github pages不要使用Jekyll处理这个站点
    ```
    需要在项目根目录保存空文件`.nojekyll`
5. 提交deploy.yml。等待系统自动部署。

## 常见问题
*  [持久化远程图片](持久化远程图片.md)
## 参考文献
* [https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html](https://docs.bugdesigner.cn/docs/Tutorial/vitepress.html)
* [https://www.bilibili.com/video/BV1XW4y1w7bc/](https://www.bilibili.com/video/BV1XW4y1w7bc/)
   

        
    