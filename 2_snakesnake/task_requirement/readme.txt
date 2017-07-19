目录结构：
|---15级种子班通宵测试题.pdf : 本次通宵测试任务书
|---readme.txt ：本本件
|---src ： 提供相关API源码
    |---queue.h ：队列库头文件
	|---queue.c : 队列库源码 
	|---snake.c ：贪吃蛇（Windows）客户端
	|--snake_linux.c : 贪吃蛇(Linux)客户端
	
|---demo
	|---snake.exe : snake.c编译后的可执行demo
	|---snake_client.exe ： 本次最终实现效果客户端demo
	|---snake_server.exe ： 本次最终实现效果服务器demo
	
注意：
demo运行时：
1. snake.exe启动后，要先按空格才能开始游戏，通过WSAD控制蛇1，UJHK控制蛇2
2. 先运行snake_server.exe监听端口，再启动snake_client进行相互连接，通过WSAD,UJHK八个按键可以同时控制两个进程的贪吃蛇。