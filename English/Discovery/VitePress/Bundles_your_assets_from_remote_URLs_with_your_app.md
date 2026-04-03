<!--$layout:block--> 
<!--$lang: en_US--> 
<!--$zh_CN: /简体中文/探索/VitePress/持久化远程图片.html-->
<!--#Doc--> 

![]()
#  Bundles your assets from remote URLs with your app

 [![](/Resources/icon/github.svg?class=icon)Github](https://github.com/antfu/vite-plugin-remote-assets?class=btn%20alt)
 
  ```html
   <img  src="http.../test.jpg" />
  ```
  ```markdown
    ![test](http.../test.jpg)
  ```
  To
  
  ```html
   <img  src="assets/xxx.jpg" />
  ```
## Install
  ```
    npm i -D vite-plugin-remote-assets
  ``` 

  vite.config.ts
  ``` 
    import RemoteAssets from 'vite-plugin-remote-assets' 
    export default {
      plugins: [
        RemoteAssets()
      ]
    }
  ```

## Use in VitePress
  ```    
    export default defineConfig({
      ... 
      vite:{ 
        plugins:[
          RemoteAssets({ assetsDir:...}) 
        ]
      }, 
      ...
    })
  ``` 
<!--Doc#-->