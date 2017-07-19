//
// Created by PetnaKanojo on 18/07/2017.
//

/*
 *
一个简易的 Server 的流程如下：

1.建立连接，接受一个客户端连接。
2.接受请求，从网络中读取一条 HTTP 请求报文。
3.处理请求，访问资源。
4.构建响应，创建带有 header 的 HTTP 响应报文。
5.发送响应，传给客户端。
省略流程 3，大体的程序与调用的函数逻辑如下：

socket() 创建套接字
bind() 分配套接字地址
listen() 等待连接请求
accept() 允许连接请求
read()/write() 数据交换
close() 关闭连接

 */
/*

创建一个基于ipv4和tcp协议的socket
然后绑定监听的地址和端口，用127.0.0.1绑定到本地地址，客户端必须同时在本机运行才能连接
调用listen开始进行监听，传入的参数指定等待连接的最大数量
之后通过一个永久循环来姐姐手来自客户端的连接。accept()会等待并返回一个客户端的连接
每个连接都必须创建新线程进行处理。
*/


//
//实现客户端每次发送消息后，不必等待服务器回复，可以立即监听键盘并输出。
//实现效果要求：客户端服务器分别创建一条子线程：
//客户端主线程用于监听键盘输入，并发给服务器，子线程用于接收服务器发送的内容，并输出
//服务器主线程用于接收客户端消息，加上前缀再发送给客户端，并打印到控制台，子进程每隔一秒向控制台输出"seedclass"

#include <sys/time.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <arpa/inet.h>

#define PORT 4444

#define BACKLOG 1
#define MAXRECVLEN 1024

pthread_t thread[1];
void *thread1() {
    while(1) {
        printf("SeedClass\n");
        sleep(2);
    }
}


void thread_create(void) {
    int temp;
    memset(&thread[0], 0, sizeof(thread));
    /*创建线程*/
    if ((temp = pthread_create(&thread[0],NULL,thread1, NULL)) != 0) {
        printf("Fail to create thread1\n");
    } else {
        printf("线程1被创建\n");
    }
}

void thread_wait(void) {
    /*等待线程结束*/
    if (thread[0] != 0) {
        pthread_join(thread[0],NULL);
        printf("线程1已经结束\n");
    }
}



int main(int argc, char *argv[])
{
    char buf[MAXRECVLEN];
    int listenfd, connectfd;  /* socket descriptors */
    struct sockaddr_in server; /* server's address information */
    struct sockaddr_in client; /* client's address information */
    socklen_t addrlen;
    /* Create TCP socket */
    if ((listenfd = socket(AF_INET, SOCK_STREAM, 0)) == -1)
    {
        /* handle exception */
        perror("socket() error. Failed to initiate a socket\n");
        exit(1);
    }

    /* set socket option */
    int opt = SO_REUSEADDR;
    setsockopt(listenfd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    bzero(&server, sizeof(server));

    server.sin_family = AF_INET;
    server.sin_port = htons(PORT);
    server.sin_addr.s_addr = htonl(INADDR_ANY);
    if(bind(listenfd, (struct sockaddr *)&server, sizeof(server)) == -1)
    {
        /* handle exception */
        perror("Bind() error.\n");
        exit(1);
    }

    if(listen(listenfd, BACKLOG) == -1)
    {
        perror("listen() error. \n");
        exit(1);
    }

    addrlen = sizeof(client);
    printf("Server Socket Port: %d\n",PORT);
    while(1){
        thread_create();
        if((connectfd=accept(listenfd,(struct sockaddr *)&client, &addrlen))==-1)
        {
            perror("accept() error. \n");
            exit(1);
        } else {
            printf("Start accepting\n");
        }
        printf("New connection come\n");
        struct timeval tv;
        gettimeofday(&tv, NULL);
        printf("Client's ip: %s, port: %d\n",inet_ntoa(client.sin_addr), htons(client.sin_port));
        int iret=-1;
        while(1)
        {
            iret = recv(connectfd, buf, MAXRECVLEN, 0);   //接收client信息
            if(iret>0)
            {
                printf("%s", buf);
            }else
            {
                close(connectfd);
                break;
            }
            /* print client's ip and port */
            send(connectfd, buf, iret, 0); /* send to the client welcome message */
        }
        thread_wait();
    }
    close(listenfd); /* close listenfd */
    return 0;
}

