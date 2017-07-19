//
// Created by PetnaKanojo on 18/07/2017.
//
//实现客户端每次发送消息后，不必等待服务器回复，可以立即监听键盘并输出。
//实现效果要求：客户端服务器分别创建一条子线程：
//客户端主线程用于监听键盘输入，并发给服务器，子线程用于接收服务器发送的内容，并输出
//服务器主线程用于接收客户端消息，加上前缀再发送给客户端，并打印到控制台，子进程每隔一秒向控制台输出"seedclass"

#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>  /* netdb is necessary for struct hostent */
#include <sys/termios.h>   //终端控制

#define PORT 4444  /* server port */

#define MAXDATASIZE 100

pthread_t thread[1];

void *thread1();
void thread_create();
void thread_wait(void);
int sockfd;

int main(int argc, char *argv[])
{
    int num;    /* files descriptors */
    char buf[MAXDATASIZE];    /* buf will store received text */
    struct hostent *he;    /* structure that will get information about remote host */
    struct sockaddr_in server;

    if (argc != 2)
    {
        printf("Usage: %s <IP Address>\n",argv[0]);
        exit(1);
    }

    if((he=gethostbyname(argv[1]))==NULL)
    {
        printf("gethostbyname() error\n");
        exit(1);
    }

    if((sockfd=socket(AF_INET,SOCK_STREAM, 0))==-1)
    {
        printf("socket() error\n");
        exit(1);
    }
    bzero(&server,sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(PORT);
    server.sin_addr = *((struct in_addr *)he->h_addr);
    if(connect(sockfd, (struct sockaddr *)&server, sizeof(server))==-1)
    {
        printf("connect() error\n");
        exit(1);
    }
    char send_data[100];
    //char str[100];
    thread_create(sockfd);
    while(1) {
        fgets(send_data, 100, stdin);
        //send_data = str;
        if((num=send(sockfd,send_data,sizeof(send_data),0))==-1){   //向server发送消息
            printf("send() error\n");
            exit(1);
        } else {
            printf("data send successfully\n");
        }

    }
    thread_wait();
    return 0;
}
void thread_create() {
    int temp;
    memset(&thread[0], 0, sizeof(thread));
    /*创建线程*/
    if ((temp = pthread_create(&thread[0],NULL,thread1, NULL)) != 0) {
        printf("线程1创建失败\n");
    } else {
        printf("线程1被创建\n");
    }
}

void *thread1() {
    char buf[MAXDATASIZE];
    int num;
    printf("hello, I am thread1, and I will output something");
    while(1) {
        if ((num = recv(sockfd, buf, MAXDATASIZE, 0 )) == -1) {     //获取server返回的消息
            printf("recv() error\n");
            exit(1);
        } else {
            printf("server: %s", buf);
        }
    }
}




void thread_wait(void) {
    /*等待线程结束*/
    if (thread[0] != 0) {
        pthread_join(thread[0],NULL);
        printf("线程1已经结束\n");
    }
}
