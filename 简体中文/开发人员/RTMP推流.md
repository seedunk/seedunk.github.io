# FFMpeg + Nginx-rtmp-module 实现直播

## Nginx-rtmp-module
  [关于Nginx-rtmp-module](https://seedunk.com/cat/nginx-rtmp-module/)
### Nginx添加模块
```
  ./configure \
    --with-http_ssl_module \
    --with-stream \
    --with-stream_ssl_module \
    --add-module={nginx-rtmp-module解压路径}
```

### Nginx配置

```
    rtmp {
        server {
                listen {rtmp服务端口号};
                chunk_size 4000;  
                application {HLS协议别名} {
                    live on;
                    hls on;
                    hls_path {HLS视频文件所在路径}; 
                    hls_fragment 3; # 每个HLS片段的时长
                    hls_playlist_length 60; # HLS播放列表的总时长
                }
            } 
    } 
    http { 
        server { 
            location /{HLS视频} {
                root   {HLS视频文件所在路径} 
            }  
        } 
    } 
```

### 使用nginx-http-flv-module平替Nginx-rtmp-module 
  [关于nginx-http-flv-module](https://seedunk.com/cat/nginx-http-flv-module/)
1. Nginx添加模块
    ```
     ./configure \
        --with-http_ssl_module \
        --with-stream \
        --with-stream_ssl_module \
        --add-module={nginx-http-flv-module解压路径}
    ``` 
2. Nginx配置
    ``` 
        rtmp {
            server {
                listen {rtmp服务端口号};
                chunk_size 4000; 
                application {FLV协议别名} {
                    live on;
                    #allow publish 127.0.0.1;
                    allow play all;
                    gop_cache on;
                }

                application {HLS协议别名} {
                    live on;
                    hls on;
                    hls_path {HLS视频文件所在路径}; 
                }
            }
        }

            http {
                include       mime.types;
                default_type  application/octet-stream;
                sendfile        off;
                server_names_hash_bucket_size 128;
                client_body_timeout   10;
                client_header_timeout 10;
                keepalive_timeout     30;
                send_timeout          10;
                keepalive_requests    10;
            
            server {
                    listen       80; 
                    add_header Access-Control-Allow-Credentials true;
                    add_header Access-Control-Allow-Origin *;
                    add_header Access-Control-Allow-Methods 'GET, POST, PUT, DELETE, OPTIONS';
                    add_header Access-Control-Allow-Headers 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,tenantappid';
                    if ($request_method = 'OPTIONS') {
                        return 200;
                    }

                    location /{直播} {
                        flv_live on; 
                        chunked_transfer_encoding on;
                    }

                    location /{HLS视频} {
                        root   {HLS视频文件所在路径};
                        index  index.html index.htm;
                    }
            }
        }
    ```
 
## FFMpeg推流

### 推送本地视频
```
   ffmpeg.exe -re -i {视频.mp4} -f flv -c:v libx264 -crf 20 -c:a copy rtmp://{IP:Port}/{FLV协议别名/HLS协议别名}/{媒体别名} 
   ffmpeg.exe -re -i {视频.mp4} -f flv -vcodec libx264 -acodec aac rtmp://{IP:Port}/{FLV协议别名/HLS协议别名}/{媒体别名}
```
* **-c:v libx264** 视频转码输出
* **-c:a copy**    音频直接输出

### 推送摄像头、音频

```
    # 查看本地的音视频硬件
    ffmpeg.exe -list_devices true -f dshow -i dummy
    
    # 推送摄像头、音频
    ffmpeg.exe -f dshow -i audio="{硬件名称|麦克风阵列 (适用于数字麦克风的英特尔® 智音技术)}" -thread_queue_size 1024 -f dshow -i video="{硬件名称|Integrated Camera}" -s 480x320 -vcodec libx264 -acodec aac -f flv rtmp://{IP:Port}/{FLV协议别名/HLS协议别名}/{别名}
     
```

### 推送系统桌面
```
  ffmpeg.exe  -f gdigrab -i desktop -vcodec libx264 -f flv rtmp://{IP:Port}/{FLV协议别名/HLS协议别名}/{别名}
```




## 测试播放
### 基于FLV协议播放
```html
    <script src="https://cdn.bootcdn.net/ajax/libs/flv.js/1.6.2/flv.min.js"></script>
    <video id="video" src="" muted autoplay="false" controls></video>
    <script>
        const videoElement = document.getElementById('video');
        const flvPlayer = flvjs.createPlayer({
            type: 'flv',
            url: 'http://{IP}/{直播地址}?port={rtmp服务端口号}&app={FLV协议别名}&stream={媒体别名}'
        });
        flvPlayer.attachMediaElement(videoElement);
        flvPlayer.load();
        flvPlayer.play();
    </script>
```

### 基于HLS协议播放
```html
     <link href="https://cdn.bootcdn.net/ajax/libs/video.js/7.7.1/video-js.min.css" rel="stylesheet">
    <script src="https://cdn.bootcdn.net/ajax/libs/video.js/7.7.1/video.min.js"></script>
    <video id="video" class="video-js vjs-default-skin" src="" muted autoplay="false" controls></video>
    <script>
        const playerOptions = {
            playbackRates: [0.7, 1.0, 1.5, 2.0],
            autoplay: false, // 如果true,浏览器准备好时开始回放。
            muted: true, // 默认情况下将会消除任何音频。
            loop: false,
            preload: 'false', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
            notSupportedMessage: "此视频暂无法播放，请稍后再试", // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
            poster: '',
            sources: [{
                type: 'application/x-mpegURL',
                src: 'http://{IP}/{HLS视频}/{媒体别名}.m3u8' //视频流地址
            }],
        }
        const videoDom = document.querySelector('#video')
        let $player = videojs(videoDom, playerOptions, function onPlayerReady() {
            console.log('播放器已经准备好了!')
            this.on('loadstart', function () {
                console.log('loadstart------------')
            })
            this.on('loadedmetadata', function () {
                console.log('loadedmetadata---视频源数据加载完成----')
            })
            this.on('loadeddata', function () {
                console.log('loadeddata---渲染播放画面----'); //autoPlay必须为false
                // $player.play()
            })
        })
    </script> 
```