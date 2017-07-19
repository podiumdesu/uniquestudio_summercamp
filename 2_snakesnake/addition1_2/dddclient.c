//
// Created by PetnaKanojo on 18/07/2017.
//
//实现客户端每次发送消息后，不必等待服务器回复，可以立即监听键盘并输出。
//实现效果要求：客户端服务器分别创建一条子线程：
//客户端主线程用于监听键盘输入，并发给服务器，子线程用于接收服务器发送的内容，并输出
//服务器主线程用于接收客户端消息，加上前缀再发送给客户端，并打印到控制台，子进程每隔一秒向控制台输出"seedclass"


//task7
// 客户端监听键盘输入，将wsad按键指令发送给客户端。

#include <stdlib.h>
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <netinet/in.h>
#include <pthread.h>
#include <netdb.h>  /* netdb is necessary for struct hostent */
#include <sys/termios.h>   //终端控制
#include "queue.h"

#define PORT 4444  /* server port */

#define MAXDATASIZE 100

const char arrow[5] = "WSAD";   //只监听WASD（注意大写）按键指令

pthread_t thread[2];
pthread_mutex_t mutex;
linkqueue_st *queue = NULL;
int sockfd;

char scanKeyboard(void);

void *thread1(void);

void *thread2(void);

void thread_create(void);

void thread_wait(void);

int main(int argc, char *argv[]) {
    int num;    /* files descriptors */
    struct hostent *he;    /* structure that will get information about remote host */
    struct sockaddr_in server;

    if (argc != 2) {
        printf("Usage: %s <IP Address>\n", argv[0]);
        exit(1);
    }

    if ((he = gethostbyname(argv[1])) == NULL) {
        printf("gethostbyname() error\n");
        exit(1);
    }

    if ((sockfd = socket(AF_INET, SOCK_STREAM, 0)) == -1) {
        printf("socket() error\n");
        exit(1);
    }
    bzero(&server, sizeof(server));
    server.sin_family = AF_INET;
    server.sin_port = htons(PORT);
    server.sin_addr = *((struct in_addr *) he->h_addr);
    if (connect(sockfd, (struct sockaddr *) &server, sizeof(server)) == -1) {
        printf("connect() error\n");
        exit(1);
    }
    queue = linkqueue_init(100);
    pthread_mutex_init(&mutex, 0);
    thread_create();
    char buf;
    while (1) {
        num = recv(sockfd, &buf, sizeof(char), 0);
        if (num > 0){
            pthread_mutex_lock(&mutex);
            linkqueue_enqueue(queue, buf);
            pthread_mutex_unlock(&mutex);
        } else {
            //printf("server: %c", buf);
            printf("recv() error\n");
            exit(1);
        }
    }
    return 0;
}

char scanKeyboard(void) {   //获取键盘实时输入
    char input;
    struct termios new_settings, stored_settings;
    tcgetattr(0, &stored_settings);
    new_settings = stored_settings;
    new_settings.c_lflag &= (~ICANON);
    new_settings.c_lflag &= (~ECHO);
    new_settings.c_cc[VTIME] = 0;
    tcgetattr(0, &stored_settings);
    new_settings.c_cc[VMIN] = 1;
    tcsetattr(0, TCSANOW, &new_settings);
    input = getchar();
    tcsetattr(0, TCSANOW, &stored_settings);
    return input;
}


void *thread1(void) {
    while (1) {
        init();
        draw(0);
        draw(1);
        while (1) {
            play();
        }
    }
}

void *thread2(void) {
    while (1) {
        int num;
        char send_data = scanKeyboard();
        for (int i = 0; i < 4; i++) {
            if (send_data == arrow[i]) {
                if ((num = send(sockfd, &send_data, sizeof(send_data), 0)) == -1) {   //向server发送消息
                    printf("send() error\n");
                    exit(1);
                } else {
                    pthread_mutex_lock(&mutex);
                    linkqueue_enqueue(queue, send_data);
                    pthread_mutex_unlock(&mutex);
                    printf("data send successfully\n");
                }
            }
        }
    }
}

void thread_create(void) {
    int temp;
    memset(thread, 0, sizeof(thread));
    if ((temp = pthread_create(&thread[0], NULL, thread1, NULL)) != 0) {
        printf("Fail to create thread1\n");
    } else {
        printf("Create thread1\n");
    }
    if ((temp = pthread_create(&thread[1], NULL, thread2, NULL)) != 0) {
        printf("Fail to create thread1\n");
    } else {
        printf("Create thread2\n");
    }

}

void thread_wait(void) {
    /*等待线程结束*/
    if (thread[0] != 0) {
        pthread_join(thread[0], NULL);
    }
    if (thread[1] != 0) {
        pthread_join(thread[1], NULL);
    }

}
