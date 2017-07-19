#include <stdio.h>
#include <pthread.h>
#include <string.h>
#include <unistd.h>
#include <sys/termios.h>

pthread_t thread[1];
const char arrow[17] = "WSADUJHKwsadujhk";
char scanKeyboard(){
    char input;
    struct termios new_settings,stored_settings;
    tcgetattr(0,&stored_settings);
    new_settings = stored_settings;
    new_settings.c_lflag &= (~ICANON);
    new_settings.c_lflag &= (~ECHO);
    new_settings.c_cc[VTIME] = 0;
    tcgetattr(0,&stored_settings);
    new_settings.c_cc[VMIN] = 1;
    tcsetattr(0,TCSANOW,&new_settings);
    input = getchar();
    tcsetattr(0,TCSANOW,&stored_settings);
    return input;
}

int getCharFromKeyboard(){
    while(1){
        char now = scanKeyboard();
        int length = strlen(arrow);
        for (int i = 0; i < length; i++) {
            if (now == arrow[i]) {
                printf("%d",now);
            }
        }
    }
    return 0;
}

void *thread1() {
    printf("hello, I am thread1, and I will output something");
    while(1) {
        printf("SeedClass\n");
        sleep(1);
    }
}

void thread_create(void) {
    int temp;
    memset(&thread[0], 0, sizeof(thread));
    /*创建线程*/
    if ((temp = pthread_create(&thread[0],NULL,thread1, NULL)) != 0) {
        printf("线程1创建失败\n");
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

int main() {
    thread_create();
    getCharFromKeyboard();
    thread_wait();
    return 0;
}



