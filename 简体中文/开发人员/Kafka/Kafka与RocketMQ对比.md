<!--$layout:doc--> 
<!--$lang: zh_CN--> 
<!--$en_US: /English/comesoon.html--> 
<!--$ja_JP: /日本語/comesoon.html-->
 
# Kafka与RocketMQ对比
 
 RocketMQ参考了Kafka,并且简化了架构丰富了功能。但数据显示Kafka的17w吞吐量远大于RocketMQ的10w。
 区别在于零拷贝方案上RocketMQ使用可以返回消息内容但效率低mmap而Kafka使用无返回但效率更高的sendfile 

## 零拷贝
 
 为防止数据丢失，队列中的消息一般不放在内存里，而是放在磁盘上。
 
 ![](https://seedunk.com/media/sd-github-page/kafka-readme-01.draw.png)
 
 消息发布过程中程序先发起READ，先将磁盘数据从设备拷贝到内核空间缓冲区，再从内核拷贝到用户缓冲区，程序再发起WRITE将数据写入Socket缓冲区，再通过网络到达消费者。

 ![](https://seedunk.com/media/sd-github-page/kafka-readme-02.draw.png)

 整个过程程序发生了2次系统调用，对应4次用户空间和内核空间的切换，以及4次数据拷贝，效率太低。
 为此操作系统提供mmap和sendfile等API来减少缓冲区间的数据拷贝次数称为零拷贝，这可以大幅提高效率。
## mmap 
 ![](https://seedunk.com/media/sd-github-page/kafka-readme-mmap.draw.png)
  1. mmap调用
  2. mmap返回
  3. write调用
  4. write返回
  共两次程序调用，对应4次用户空间和内核空间的切换，3次数据拷贝。
## sendfile
   ![](https://seedunk.com/media/sd-github-page/kafka-readme-sendfile.draw.png) 
   
  共1次程序调用，对应2次用户空间和内核空间的切换，2次数据拷贝。sendfile的拷贝功能通过DMA控制器进行，CPU不参与工作，所谓称为零CPU拷贝。

  RocketMQ为实现更多功能，需要得到消息内容供应用程处理，所以只能使用效率低的mmap。

## 参考
 [https://www.bilibili.com/video/BV1Zy411e7qY/](https://www.bilibili.com/video/BV1Zy411e7qY/)
 

 
 