#include<curses.h>
#include<stdlib.h>
#include<unistd.h>
#include<time.h>
struct snack {
	int x[100], y[100];
	int node;
	int life;
	int direction;
} snacks[2];
struct timespec delay;
struct timespec dummy;
time_t timer;
int TIME = 0;
long Time, Time1 = 0, Time2 = 0;
int ptime[100];
int score = 0;
int i, tem[2][2], k = 0;
void color();
void init();
void draw();
void start_attr();
void output();
void play();
void judge();
int pause_time(int, int *);
void d_e();
void key_input();
#define W 87
#define S 83
#define A 65
#define D 68
#define U 85
#define J 74
#define H 72
#define K 75

char keys_arr[2][4] = { { W, S, A, D }, { U, J, H, K } };
char keys[2] = { D, K };

void d_e() {
	delay.tv_nsec = 150000000;
}

int pause_time(int k, int *PTIME) {
	int j;
	int sum = 0;
	for (j = 0; j < k; j++)
		sum = sum + ptime[j];
	return sum;
}
void judge(int index) {
	if (snacks[index].direction == 1)
		snacks[index].y[0]--;
	else if (snacks[index].direction == 2)
		snacks[index].y[0]++;
	else if (snacks[index].direction == 3)
		snacks[index].x[0]--;
	else
		snacks[index].x[0]++;
}
void color() {
	start_color();
	init_pair(1, COLOR_GREEN, COLOR_RED);
	attron(COLOR_PAIR(1));
	for (i = 0; i < 50; i++)
		mvaddch(0, i, '*');
	for (i = 0; i < 20; i++)
		mvaddch(i, 0, '*');
	for (i = 49; i >= 0; i--)
		mvaddch(19, i, '*');
	for (i = 19; i >= 0; i--)
		mvaddch(i, 49, '*'); //box(stdscr,'*','*');

	attroff(COLOR_PAIR(1));
}
void init() {
	initscr();
	raw();
	noecho();
	keypad(stdscr, TRUE);
	curs_set(0);
	nodelay(stdscr, TRUE);
}
void draw(int index) {
	int i = 0;
	int y = index == 0 ? 3 : 10;
	for (i = 6; i > 0; i--) {
		snacks[index].x[6 - i] = i;
		snacks[index].y[6 - i] = y;
	}
	snacks[index].life = 0;
	snacks[index].node = 6;
	snacks[index].direction = 4;
	color();
	d_e();
	for (i = 0; i < snacks[index].node; i++)
		mvprintw(snacks[index].y[i], snacks[index].x[i], "*");
	refresh();
	timer = time(NULL);
}
void output() {
	color();
	attroff(A_REVERSE);
	refresh();
}
void start_attr() {
	attron(A_REVERSE);
}

void play() {
	Time = time(NULL);
	TIME = Time - timer - pause_time(k, ptime);
	clear();
	int index;
	for (index = 0; index <= 1; index++) {
		for (i = snacks[index].node - 1; i > 0; i--) {
			snacks[index].x[i] = snacks[index].x[i - 1];
			snacks[index].y[i] = snacks[index].y[i - 1];
		}
		key_input();
		switch (keys[index]) {
		case (U):
		case (W):
			if (snacks[index].direction == 3 || snacks[index].direction == 4) {
				snacks[index].y[0]--;
				snacks[index].direction = 1;
			} else if (snacks[index].direction == 1)
				snacks[index].y[0]--;
			else
				snacks[index].y[0]++;
			break;
		case (J):
		case (S):
			if (snacks[index].direction == 3 || snacks[index].direction == 4) {
				snacks[index].y[0]++;
				snacks[index].direction = 2;
			} else if (snacks[index].direction == 1)
				snacks[index].y[0]--;
			else
				snacks[index].y[0]++;
			break;
		case (H):
		case (A):
			if (snacks[index].direction == 1 || snacks[index].direction == 2) {
				snacks[index].x[0]--;
				snacks[index].direction = 3;
			} else if (snacks[index].direction == 3)
				snacks[index].x[0]--;
			else
				snacks[index].x[0]++;
			break;
		case (K):
		case (D):
			if (snacks[index].direction == 1 || snacks[index].direction == 2) {
				snacks[index].x[0]++;
				snacks[index].direction = 4;
			} else if (snacks[index].direction == 3)
				snacks[index].x[0]--;
			else
				snacks[index].x[0]++;
			break;
		}
		for (i = 1; i < snacks[index].node; i++) //检测是否撞墙
			if ((snacks[index].x[0] == snacks[index].x[i]
					&& snacks[index].y[0] == snacks[index].y[i])
					|| snacks[index].x[0] == 0 || snacks[index].y[0] == 0
					|| snacks[index].x[0] == 49 || snacks[index].y[0] == 19) {
				clear();
				exit(0);
			}
		struct snack o_snack = snacks[(index + 1) % 2], c_snack = snacks[index];
		for (i = 0; i < o_snack.node; i++) {
			if (c_snack.x[0] == o_snack.x[i] && c_snack.y[0] == o_snack.y[i]) {
				clear();
				exit(0);
			}
		}
		for (i = 0; i < snacks[index].node; i++)
			mvprintw(snacks[index].y[i], snacks[index].x[i], "*");
	}
	start_attr();
	output();
	nanosleep(&delay, &dummy); //sleep(2);
}


/**********************************
 *    建议修改一下函数
 *********************************/

void key_input() {
	int ch = 0;
	ch = 'S';
    keys[0] = "S";
    keys[1] = "A";
	/*if (ch == 'W' || ch == 'S' || ch == 'A' || ch == 'D') {
		keys[0] = ch;
	} else if (ch == 'U' || ch == 'J' || ch == 'H' || ch == 'K') {
		keys[1] = ch;
	}*/
}

int main(int argc, char **argv) {

	init();
	draw(0);
	draw(1);
	while (1) {
		play();
	}
	return 0;
}


