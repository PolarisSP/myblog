---
tilte: 事务隔离
tag:
    - 事务
    - 隔离级别
sidebar: true
categories: Mysql
date: 2021-10-06 10:48:00
---

## 隔离性与隔离级别

提到事务你一定会想到ACID，(Automicity、Consistency、Isolation、Durability，即原子性，一致性，隔离性，持久性)，本篇主要说明I，即“隔离性”。

当多个事务同时执行时，就可能出现脏读、不可重复读、幻读的问题，为了解决这些问题，就有了“隔离级别”这个概念。隔离级别越严实，效率就会越低，我们需要在二者之间找一个。SQL标准的事务隔离级别包括：读未提交、读提交、可重复读和串行读。

- 读未提交：一个事务还没提交时，它做的变更就能被别的事务所看到。
- 读提交： 一个事务提交后，它做的变更才会被其他事务所看到。
- 可重复读：一个事务执行过程中看到的数据，总是跟这个事务在启动时看到的数据是一致的。当然在可重复读隔离级别下，未提交变更对其他事务也是不可见的。
- 串行读：对于同一行记录，“写”会加“写锁”，“读”会加“读锁”。当出现读写锁冲突的时候，后访问的事务必须等前一个事务执行完成，才能继续执行。

![思考不同隔离级别下](/myblog/images/mysql/思考不同隔离级别下.png)

在实现上，数据库中会创建一个视图，访问时以视图的逻辑结构为准，在RR下，这个视图是事务启动时创建的，整个事务存在期间都用这个视图。在“读提交”下，视图是在每个SQL语句开始执行的时候创建的。在“读未提交”下，直接返回记录上的最新值，没有视图概念。而”串行读“下，则直接加锁的方式来避免并发访问。

## 事务隔离的实现

此处重点说明“可重复读”，在Mysql中，实际上每条记录在更新的时候都会同时记录一条回滚操作。记录上的最新值，可以通过回滚操作，都可以得到前一个状态的值。当没有事务再需要用到这些回滚日志时，回滚日志会被删除。什么时候才不需要了呢？就是当系统里没有比这个回滚日志更早的 read-view 的时候。

为什么不建议你使用长事务？ 长事务意味着系统内会存在很老的事务视图。由于这些事务随时可能访问数据库中的任何数据，所以这个事务提交之前，数据库中它可能用到的回滚记录都必须保留，这就会导致大量占用存储空间。除了对回滚段的影响，长事务还占用锁资源，也可能拖垮整个库。

## 事务的启动方式

1. 显式启动事务语句，begin或start transaction。配套的提交语句为commit，回滚为rollback。
2. set autocommit = 0，这个命令会将这个线程的自动提交关闭。这个事务会持续到你主动执行commit或rollback语句，或断开连接。

通常建议使用显式启动事务。

## 小结

读未提交：别人改数据的事务尚未提交，我在我的事务中也能读到。
读已提交：别人改数据的事务已经提交，我在我的事务中才能读到。
可重复读：别人改数据的事务已经提交，我在我的事务中也不去读。
串行：我的事务尚未提交，别人就别想改数据。
这4种隔离级别，并行性能依次降低，安全性依次提高。


事务与锁，在学习事务的时候，RR下的事务，好像与世无争，不受外界影响，他看到的数据是事务开始时创建的视图，这个视图是基于全库的。而在行级锁时，一个事务要更新一行，如果刚好有另外一个事务拥有这一行的行锁，它又不能这么超然了，会被锁住，进入等待状态。所以问题是，既然进入了等待状态，那么等到这个事务自己获取到行锁要更新数据的时候，它读到的值又是什么呢？
```mysql
mysql> CREATE TABLE `t` (
  `id` int(11) NOT NULL,
  `k` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
insert into t(id, k) values(1,1),(2,2);
```

![事务 A、B、C 的执行流程](/myblog/images/mysql/事务ABC的执行流程.png)

思考这个问题，需要注意事务的启动时机。（begin/start transaction 命令并不是一个事务的起点，在执行到它们之后的第一个操作 InnoDB 表的语句，事务才真正启动。如果你想要马上启动一个事务，可以使用 start transaction with consistent snapshot 这个命令。）

正确的答案是：事务 B 查到的 k 的值是 3，而事务 A 查到的 k 的值是 1。

这里先完善一个概念：
事务的ID是顺序递增的。
事务会开发一个ReadView，这个ReadView包含：
    1. m_ids:包含了当前的活跃事务的id。
    2. min_trx_id:m_ids中最小的事务id。
    3. max_trx——id：当前系统里面已经创建过的事务 ID 的最大值加 1。
    4. creator_trx_id：当前创建ReadView事务的ID
另外还有一个概念是每行数据都会存在一个row_trx_id和roll_pointer（用于指向回滚的undo log）

![数据版本可见性规则](/myblog/images/mysql/数据版本可见性规则.png)

这样，对于当前事务的启动瞬间来说，一个数据版本的 row trx_id，有以下几种可能：

1. 如果落在绿色部分，表示这个版本是已提交的事务或者是当前事务自己生成的，这个数据是可见的；

2. 如果落在红色部分，表示这个版本是由将来启动的事务生成的，是肯定不可见的；

3. 如果落在黄色部分，那就包括两种情况(数组指m_ids数组，即活跃的事务)
    a. 若 row trx_id 在数组中，表示这个版本是由还没提交的事务生成的，不可见；
    b. 若 row trx_id 不在数组中，表示这个版本是已经提交了的事务生成的，可见。


一个数据版本，对于一个事务视图来说，除了自己的更新总是可见以外，有三种情况：（此方式主要针对快照读的select）

1. 版本未提交，不可见；

2. 版本已提交，但是是在视图创建后提交的，不可见；

3. 版本已提交，而且是在视图创建前提交的，可见。

当它要去更新数据的时候，就不能再在历史版本上更新了，否则事务 C 的更新就丢失了。（此方式主要针对增删改和加了锁的select，需要读最新值，要等待获取锁）
用到了这样一条规则：更新数据都是先读后写的，而这个读，只能读当前的值，称为“当前读”（current read）。
其实，除了 update 语句外，select 语句如果加锁，也是当前读。加上 lock in share mode（S 锁，共享锁） 或 for update（X 锁，排他锁）。
