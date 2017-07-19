#include<stdio.h>
#include<time.h>
#include<windows.h>
#include<stdlib.h>

typedef struct SNAKE //�����һ���ڵ�
{
    int x;
    int y;
    struct SNAKE *next;
} snake;

//ȫ�ֱ���//
int score = 0, add = 10; //�ܵ÷���ÿ�γ�ʳ��÷֡�
int sleeptime = 200; //ÿ�����е�ʱ����
snake *head1; //��ͷָ��
snake *head2; //��ͷָ��
//��Ϸ�����������1��ײ��ǽ��2��ҧ���Լ���3�������˳���Ϸ��
const char END_ESCAPE = 0;
const char END_CRASH_WALL = 1;
const char END_CRASH_SELF = 2;
const char END_CRASH_OTHERS = 3;

// ��������ַ���ASCII���Ӧ��ϵ
#define W 87
#define S 83
#define A 65
#define D 68
#define U 85
#define J 74
#define H 72
#define K 75

// ��ⰴ��
char key1 = D, key2 = K;
char key1_arr[4] = { W, S, A, D }, key2_arr[4] = { U, J, H, K };

//����ȫ������
void print_pos();
void creat_Map();
snake* init_snake();
int bite_self();
int bite_other();
void cant_cross_wall();
snake * snake_move(snake*, char);
void pause();
void game_circle();
void end_game();
void game_init();
void key1_set();
void key2_set();
void key_input();

void print_pos(int x, int y) //���ù��λ��
{
    COORD pos;
    HANDLE hOutput;
    pos.X = x;
    pos.Y = y;
    hOutput = GetStdHandle(STD_OUTPUT_HANDLE);
    SetConsoleCursorPosition(hOutput, pos);
}

void creat_Map() //������ͼ
{
    int i;
    for (i = 0; i < 58; i += 2) //��ӡ���±߿�
            {
        print_pos(i, 0);
        printf("��");
        print_pos(i, 26);
        printf("��");
    }
    for (i = 1; i < 26; i++) //��ӡ���ұ߿�
            {
        print_pos(0, i);
        printf("��");
        print_pos(56, i);
        printf("��");
    }
}

snake* init_snake(int init_x, int init_y) //��ʼ������
{
    snake *head, *tail;
    int i;
    tail = (snake*) malloc(sizeof(snake)); //����β��ʼ��ͷ�巨����x,y�趨��ʼ��λ��//
    tail->x = init_x;
    tail->y = init_y;
    tail->next = NULL;
    for (i = 1; i <= 4; i++) {
        head = (snake*) malloc(sizeof(snake));
        head->next = tail;
        head->x = init_x + 2 * i;
        head->y = init_y;
        tail = head;
    }
    while (tail != NULL) //��ͷ��Ϊ���������
    {
        print_pos(tail->x, tail->y);
        printf("��");
        tail = tail->next;
    }
    return head;
}

int bite_self(snake *head) //�ж��Ƿ�ҧ�����Լ�
{
    snake *self;
    self = head->next;
    while (self != NULL) {
        if (self->x == head->x && self->y == head->y) {
            return 1;
        }
        self = self->next;
    }
    return 0;
}

/**
 * 0:û��ײ
 * 1:player1 ҧ��player2
 * 2:player2 ҧ��player1
 */
int bite_other() //�ж��Ƿ�ҧ���˱���
{
    snake *player1 = head1, *player2 = head2->next;
    while (player2 != NULL) {
        if (player1->x == player2->x && player1->y == player2->y) {
            return 1;
        }
        player2 = player2->next;
    }
    player1 = head1->next, player2 = head2;
    while (player1 != NULL) {
        if (player1->x == player2->x && player1->y == player2->y) {
            return 2;
        }
        player1 = player1->next;
    }
    return 0;
}

void cant_cross_wall(snake *head) //���ܴ�ǽ
{
//    printf("%d,%d",head->x,head->y);
    if (head->x == 0 || head->x == 56 || head->y == 0 || head->y == 26) {
        end_game(END_CRASH_WALL, head);
    }
}

snake *snake_move(snake *head, char key) //��ǰ��,��U,��D,��L,��R
{
    snake * nexthead;
    snake * q;
    cant_cross_wall(head);
    nexthead = (snake*) malloc(sizeof(snake));
    if (key == W || key == U) {
        nexthead->x = head->x;
        nexthead->y = head->y - 1;
    }
    if (key == S || key == J) {
        nexthead->x = head->x;
        nexthead->y = head->y + 1;
    }
    if (key == A || key == H) {
        nexthead->x = head->x - 2;
        nexthead->y = head->y;
    }
    if (key == D || key == K) {
        nexthead->x = head->x + 2;
        nexthead->y = head->y;
    }
    nexthead->next = head;
    head = nexthead;
    q = head;
    while (q->next->next != NULL) {
        print_pos(q->x, q->y);
        printf("��");
        q = q->next;
    }
    print_pos(q->next->x, q->next->y);
    printf(" ");
    free(q->next);
    q->next = NULL;
    if (bite_self(head) == 1) { //�ж��Ƿ��ҧ���Լ�
        end_game(END_CRASH_SELF, head);
    }
    if (bite_other() != 0) {
        end_game(END_CRASH_OTHERS, NULL);
    }
    return head;

}

void pause() //��ͣ
{
    while (1) {
        Sleep(300);
        if (GetAsyncKeyState(VK_SPACE)) {
            break;
        }
    }
}

void end_game(int status, snake* loser) //������Ϸ
{
    system("cls");
    print_pos(24, 12);
    if (status == 0) {
        printf("��Ϸ������");
    } else {
        if (loser == head1) {
            printf("���1����");
        } else {
            printf("���2����");
        }
    }
    exit(0);
}

void game_init() //��Ϸ��ʼ��
{
    system("mode con cols=100 lines=30");
    creat_Map();
    head1 = init_snake(10, 5);
    head2 = init_snake(10, 20);
}

void key1_set(int value)
{
    key1 = value;
}

void key2_set(int value)
{
    key2 = value;
}

/************************************************************
 *                    ���º����ṩ�����޸�                                                *
 ***********************************************************/

void game_circle() //������Ϸ�����߼�ѭ��
{
    print_pos(64, 16);
    printf("ESC ���˳���Ϸ.space����ʼ/��ͣ��Ϸ.");
    pause();
    while (1) {
        if (GetAsyncKeyState(VK_SPACE)) {
            pause();
        } else if (GetAsyncKeyState(VK_ESCAPE)) {
            end_game(END_ESCAPE, NULL);
        }
        key_input(); //��ȡ��������
//        key_input2(); //��ȡ��������
        Sleep(sleeptime);
        head1 = snake_move(head1, key1);
        head2 = snake_move(head2, key2);
    }
}

void key_input() //����û����룬����ȫ�ֱ���key1,key2
{
    int index;
    for (index = 0; index < 4; index++) {
        if (GetAsyncKeyState(key1_arr[index])) {
            key1_set(key1_arr[index]);
        }
    }
    for (index = 0; index < 4; index++) {
        if (GetAsyncKeyState(key2_arr[index])) {
            key2_set(key2_arr[index]);
        }
    }
}

void play_game()
{
    game_init();
    game_circle();
}
int main()
{
    play_game();
    return 0;
}
