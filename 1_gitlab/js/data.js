/*定义数量*/   //使用一个数组包裹的对象的时候，就不再需要初始化all了
/*var all = 3;
var open = 3;
var close = 0;
*/
/*
var issue_info = new Array();
for (var i = 1; i <= all ; i++) {
  issue_info[i] = new Object();
}
*/
/***这些全部都是数据*******/
//mentor用了很魔法的方法w
//因为后面设计函数时候的问题，所以数组第一个设置成空的对象了。
module.exports = {
  issue_info: [
    {

    },
    {
      tag: [
        "bug",
        "array_err",
        "object_err",
        "js_err",
        "ddd"
      ],
      tagColor: [
        "#aedede",
        "red",
        "yellow",
        "pink",
        "lightyellow"
      ],
      no: 1,
      name: "pushpushtest",
      date: "2017-07-03T08:47:28.713Z",
      state: 1
    },
    {
      tag: [
        "js_err",
        "bug"
      ],
      tagColor: [
        "pink",
        "#aedede"
      ],
      no: 2,
      name: "second test",
      date: "2017-07-03T08:47:28.713Z",
      state: 1
    },
    {
      tag: [
        "display_err",
        "bug",
        "wtf"
      ],
      tagColor: [
        "#fddeae",
        "#aedede",
        "#aeeaea"
      ],
      no: 3,
      name: "third push test",
      date: "2017-07-03T08:47:28.713Z",
      state: 0
    },
    {
      tag: [
        "hello-world",
        "wtf"
      ],
      tagColor: [
        "#fddddd",
        "#aeeaea"
      ],
      no: 4,
      name: "what do you want",
      date: "2017-07-03T08:47:28.713Z",
      state: 1
    },
    {
      tag: [
      ],
      tagColor: [
      ],
      no: 5,
      name: "I have no label",
      date: "2017-07-03T08:47:28.713Z",
      state: 0
    },
    {
      tag: [
      ],
      tagColor: [
      ],
      no: 6,
      name: "I have no label too",
      date: "2017-07-03T08:47:28.713Z",
      state: 1
    }
  ],
  allLabels: [
    {
      name: "bug",
      IssueHave: [1,2,3],
      color: "#aedede"
    },
    {
      name: "js_err",
      IssueHave: [1,2],
      color: "pink"
    },
    {
      name: "object_err",
      IssueHave: [1],
      color: "yellow"
    },
    {
      name: "array_err",
      IssueHave: [1],
      color: "red"
    },
    {
      name: "display_err",
      IssueHave: [3],
      color: "#fddeae"
    },
    {
      name: "ddd",
      IssueHave: [1],
      color: "lightyellow"
    },
    {
      name: "hello-world",
      IssueHave: [4],
      color: "#fddddd"
    },
    {
      name: "wtf",
      IssueHave: [3,4],
      color: "#aeeaea"
    }
  ]
};

/*
export let issue_info = [
  {

  },
  {
    tag: [
      "bug",
      "array_err",
      "object_err",
      "js_err",
      "ddd"
    ],
    tagColor: [
      "#aedede",
      "red",
      "yellow",
      "pink",
      "lightyellow"
    ],
    no: 1,
    name: "pushpushtest",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
      "js_err",
      "bug"
    ],
    tagColor: [
      "pink",
      "#aedede"
    ],
    no: 2,
    name: "second test",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
      "display_err",
      "bug",
      "wtf"
    ],
    tagColor: [
      "#fddeae",
      "#aedede",
      "#aeeaea"
    ],
    no: 3,
    name: "third push test",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
      "hello-world",
      "wtf"
    ],
    tagColor: [
      "#fddddd",
      "#aeeaea"
    ],
    no: 4,
    name: "what do you want",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  },
  {
    tag: [
    ],
    tagColor: [
    ],
    no: 5,
    name: "I have no label",
    date: "2017-07-03T08:47:28.713Z",
    state: 0
  },
  {
    tag: [
    ],
    tagColor: [
    ],
    no: 6,
    name: "I have no label too",
    date: "2017-07-03T08:47:28.713Z",
    state: 1
  }
];
*/


/*获取所有的label以及所有的labelcolor*/
/*
export let allLabels = [
  {
    name: "bug",
    IssueHave: [1,2,3],
    color: "#aedede"
  },
  {
    name: "js_err",
    IssueHave: [1,2],
    color: "pink"
  },
  {
    name: "object_err",
    IssueHave: [1],
    color: "yellow"
  },
  {
    name: "array_err",
    IssueHave: [1],
    color: "red"
  },
  {
    name: "display_err",
    IssueHave: [3],
    color: "#fddeae"
  },
  {
    name: "ddd",
    IssueHave: [1],
    color: "lightyellow"
  },
  {
    name: "hello-world",
    IssueHave: [4],
    color: "#fddddd"
  },
  {
    name: "wtf",
    IssueHave: [3,4],
    color: "#aeeaea"
  }
];
*/
