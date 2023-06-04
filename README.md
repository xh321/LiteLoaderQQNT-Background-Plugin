# background-plugin

BetterQQNT（JS版）插件，用于自动切换QQ的背景图片，并自带一些CSS优化（参考自[BetterQQNT-Test-Theme](https://github.com/mo-jinran/BetterQQNT-test-theme)）


## 使用方法

clone或下载zip文件解压，将文件夹移动至`BetterQQNT数据目录/plugins/`下面，重启QQNT即可
启动QQ后会自动写入配置文件到插件目录下面的config.json，然后你做的任何修改都会被插件动态更新（除了refreshTime）

默认加载图片的路径是插件目录下面的imgs文件夹，在QQ的设置里可以切换背景图片的目录，保存后下次更新图片时生效，目前只会读取目录同级的一些常见格式的图片文件，如下：

`const allowedExt = [".JPG", ".BMP", ".PNG", ".WEBP", ".JPEG"];  `

图片默认是居中适应，所以如果比例不对可能会不好看，尽量选择横着的图片吧~

浅色/深色模式1s检测一次，所以如果QQ变更颜色模式，会有1s的反应时间。

目前还很简陋，代码也比较粗糙，但能用！