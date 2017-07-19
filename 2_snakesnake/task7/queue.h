/*
 * queue.h
 *
 *  Created on: 2017年6月5日
 *      Author: Jeanheo
 */

#ifndef QUEUE_H_
#define QUEUE_H_

// 具体存储的数据节点
typedef struct _nodequeue_ {
	int data;
	struct _nodequeue_ *next;
} nodequeue_st;

// 先进先出队列
typedef struct _linkqueue_ {
	int total;
	int current;
	nodequeue_st *head;
	nodequeue_st *tail;
} linkqueue_st;

// 初始化一个长度为size的队列
linkqueue_st *linkqueue_init(int size);
// 根据value值创建一个数据节点
nodequeue_st *linkqueue_node_create(int value);
// 将value值放入队列中
int linkqueue_enqueue(linkqueue_st *queue, int value);
// 判断队列是否已到达初始化时规定的size长度
int linkqueue_isfull(linkqueue_st *queue);
// 数据出队列操作
int linkqueue_dequeue(linkqueue_st *queue, int *value);
// 判断队列是否为空
int linkqueue_isempty(linkqueue_st *queue);
// 释放队列存储
int linkqueue_free(linkqueue_st *queue);

#endif /* QUEUE_H_ */
