#include <stdio.h>
#include <stdlib.h>
#include "queue.h"


extern int * data;
extern int queue;

//这是一个链表吧
linkqueue_st *linkqueue_init(int size) {
	linkqueue_st *queue;
	queue = (linkqueue_st *) malloc(sizeof(linkqueue_st));
	queue->total = size;
	queue->current = 0;
	queue->head = linkqueue_node_create(0);
	queue->tail = queue->head;

	return queue;
}

nodequeue_st *linkqueue_node_create(int value) {
	nodequeue_st *node = NULL;
	node = (nodequeue_st *) malloc(sizeof(nodequeue_st));
	node->data = value;
	node->next = NULL;

	return node;
}

int linkqueue_enqueue(linkqueue_st *queue, int value) {   //向队列中添加数据
	nodequeue_st *node = NULL;
	if (linkqueue_isfull(queue))
		return -1;
	node = linkqueue_node_create(value);      //创建新的node
	node->next = queue->tail->next;
	queue->tail->next = node;
	queue->tail = node;
	queue->current++;

	return 0;
}

int linkqueue_dequeue(linkqueue_st *queue, int *value) {   //向队列中删减数据  //取出先进的数据
	nodequeue_st *tmp = NULL;
	if (linkqueue_isempty(queue))
		return -1;
	tmp = queue->head;
	*value = tmp->next->data;
	queue->head = queue->head->next;   //将队列目前的头指针向后移一位
	free(tmp);
	queue->current--;

	return 0;
}

int linkqueue_isfull(linkqueue_st *queue) {   //判断队列是否已经达到最长
	if (queue->current == queue->total)
		return 1;
	return 0;
}

int linkqueue_isempty(linkqueue_st *queue) {    //判断队列是否已经全满了
  	if (queue->current == 0)
		return 1;
	return 0;
}

int linkqueue_free(linkqueue_st *queue) {
	nodequeue_st *node = queue->head;
	nodequeue_st *tmp = NULL;

	while (node != NULL) {
		tmp = node;
		node = node->next;
		free(tmp);
	}
	free(queue);

	return 0;
}

/*

int main(void) {
	linkqueue_st *queue = NULL;
	char * data = "WASDWADSADAWDSADA";
	int index = 0;
	int value;
	queue = linkqueue_init(100);
	while(data[index] != '\0' && -1 != linkqueue_enqueue(queue, data[index++]));
	while (-1 != linkqueue_dequeue(queue, &value))
		printf("%5d", value);

	putchar('\n');
	linkqueue_free(queue);

	return 0;
}
*/

