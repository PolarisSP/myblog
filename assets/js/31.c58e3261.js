(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{589:function(t,a,_){"use strict";_.r(a);var s=_(4),r=Object(s.a)({},(function(){var t=this,a=t.$createElement,_=t._self._c||a;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"基础架构"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#基础架构"}},[t._v("#")]),t._v(" 基础架构")]),t._v(" "),_("p",[t._v("如下为Mysql基本架构示意图:")]),t._v(" "),_("p",[_("img",{attrs:{src:"/myblog/images/mysql/Mysql%E7%9A%84%E9%80%BB%E8%BE%91%E6%9E%B6%E6%9E%84%E5%9B%BE.png",alt:"Mysql的逻辑架构图"}})]),t._v(" "),_("p",[t._v("Server层包含了查询缓存，连接器，分析器，优化器和连接器，涵盖Mysql的大多数核心服务功能，以及所有的内置函数(如日期，时间，数学和加密函数等)，所有跨存储引擎的功能都在这一层实现，比如存储过程， 触发器，视图等。\n存储引擎层负责数据的存储和提取，其架构模式是插件式的，常用的存储引擎为InnoDB。")]),t._v(" "),_("h3",{attrs:{id:"连接器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#连接器"}},[t._v("#")]),t._v(" 连接器")]),t._v(" "),_("p",[t._v("辅助连接管理和权限控制，在数据库里面，长连接是指连接成功后，如果客户端持续有请求，则一直使用同一个连接。短连接则是指每次执行完很少的几次查询就断开连接，下次查询再重新建立一个。\n建立连接比较复杂，所以要尽量减少建立连接的动作，尽量使用长连接。但如果全部使用长连接，可能会出现Mysql占用内存涨得特别快，因为Mysql在执行过程中临时使用的内存是管理在连接对象里面的。这些资源在连接断开的时候才被释放，所以如果长连接累计下来，可能会出现OOM，从现象来看就是Mysql异常重启了。\n如何解决？")]),t._v(" "),_("ol",[_("li",[t._v("定期断开长连接。使用一段时间，或者在程序中判断执行过一个占用内存的大查询后，断开连接，之后要查询再重连。")]),t._v(" "),_("li",[t._v("如果使用的Mysql版本等于或高于5.7，可以在每次执行一个比较大的操作后，通过执行mysql_reset_connection来重新初始化连接资源。这个过程不需要重连和重新做权限验证，只是把连接恢复到刚创建时的状态。")])]),t._v(" "),_("h3",{attrs:{id:"查询缓存"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#查询缓存"}},[t._v("#")]),t._v(" 查询缓存")]),t._v(" "),_("p",[t._v("key为查询的语句，value为查询结果。 但不建议使用，弊大于利。只要有对一个表的更新，这个表上所以的查询缓存都会被清空，除非业务需求是一张静态表，很少去更新，如系统配置表。(在Mysql8.0开始这个功能就没有了)")]),t._v(" "),_("h3",{attrs:{id:"分析器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#分析器"}},[t._v("#")]),t._v(" 分析器")]),t._v(" "),_("p",[t._v("词法分析，语法分析。(你需要注意的是他提示中'use near'中的内容)")]),t._v(" "),_("h3",{attrs:{id:"优化器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#优化器"}},[t._v("#")]),t._v(" 优化器")]),t._v(" "),_("p",[t._v("执行计划生成，索引选择。在表中有多个索引的时候，决定使用哪个索引，在语句中有多表关联的时候，决定各个表的连接顺序。")]),t._v(" "),_("h3",{attrs:{id:"执行器"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#执行器"}},[t._v("#")]),t._v(" 执行器")]),t._v(" "),_("p",[t._v("操作引擎，返回结果。 他会去操作存储引擎，在执行之前会去进行权限检查，有些表是加了权限的。\n执行流程：")]),t._v(" "),_("ol",[_("li",[t._v("调用InnoDB引擎接口取这个表的第一行，判断条件是否满足，如果不满足则跳过，如果满足则存在结果集中。")]),t._v(" "),_("li",[t._v("调用引擎接口取下一行，继续判断，直到取到这个表的最后一行。")]),t._v(" "),_("li",[t._v("将取到的符合条件的行组成结果集返回给客户端。")])]),t._v(" "),_("h3",{attrs:{id:"存储引擎"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#存储引擎"}},[t._v("#")]),t._v(" 存储引擎")]),t._v(" "),_("p",[t._v("引擎一次只返回一条记录。")]),t._v(" "),_("h2",{attrs:{id:"日志系统"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#日志系统"}},[t._v("#")]),t._v(" 日志系统")]),t._v(" "),_("h3",{attrs:{id:"redo-log"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#redo-log"}},[t._v("#")]),t._v(" redo log")]),t._v(" "),_("p",[t._v("具体来说，当有一条记录需要更新的时候，InnoDB引擎就会先把记录写到redo log里，并更新内存，这个时候更新就算完成了。同时，InnoDB引擎会在适当的时候，将这个操作记录更新到磁盘里。(物理日志)\n有了redo log,InnoDB就可以保证即使数据库发送异常重启，之前的提交的记录都不会丢失，这个能力被称为crash-safe。")]),t._v(" "),_("h3",{attrs:{id:"bin-log"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#bin-log"}},[t._v("#")]),t._v(" bin log")]),t._v(" "),_("p",[t._v("前面提到的redo log(重做日志)是InnoDB引擎特有的日志，在Mysql的Server层也有自己的日志，称为bin log(归档日志)(逻辑日志)")]),t._v(" "),_("div",{staticClass:"custom-block tip"},[_("p",{staticClass:"title"}),_("p",[t._v('redo log 是物理日志，记录的是"在某个数据页上做了什么修改";bin log 是逻辑日志，记录的是这个语句的原始逻辑，比如"给ID=2这一行的C加上1"。\nredo log是循环写的，空间固定会用完。bin log 是可以追加写入的，并不会覆盖以前的日志。')])]),_("h3",{attrs:{id:"update执行流程"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#update执行流程"}},[t._v("#")]),t._v(" update执行流程")]),t._v(" "),_("p",[_("img",{attrs:{src:"/myblog/images/mysql/update%E8%AF%AD%E5%8F%A5%E6%89%A7%E8%A1%8C%E6%B5%81%E7%A8%8B.png",alt:"update 语句执行流程"}})]),t._v(" "),_("p",[t._v("图中浅色框表示是在 InnoDB 内部执行的，深色框表示是在执行器中执行的。")]),t._v(" "),_("ol",[_("li",[_("p",[t._v("执行器先找引擎取 ID=2 这一行。ID 是主键，引擎直接用树搜索找到这一行。如果 ID=2 这一行所在的数据页本来就在内存中，就直接返回给执行器；否则，需要先从磁盘读入内存，然后再返回。")])]),t._v(" "),_("li",[_("p",[t._v("执行器拿到引擎给的行数据，把这个值加上 1，比如原来是 N，现在就是 N+1，得到新的一行数据，再调用引擎接口写入这行新数据。")])]),t._v(" "),_("li",[_("p",[t._v("引擎将这行新数据更新到内存中，同时将这个更新操作记录到 redo log 里面，此时 redo log 处于 prepare 状态。然后告知执行器执行完成了，随时可以提交事务。")])]),t._v(" "),_("li",[_("p",[t._v("执行器生成这个操作的 binlog，并把 binlog 写入磁盘。")])]),t._v(" "),_("li",[_("p",[t._v("执行器调用引擎的提交事务接口，引擎把刚刚写入的 redo log 改成提交（commit）状态，更新完成。")])])]),t._v(" "),_("p",[t._v('你可能注意到了，最后三步看上去有点“绕”，将 redo log 的写入拆成了两个步骤：prepare 和 commit，这就是"两阶段提交"。')]),t._v(" "),_("h3",{attrs:{id:"两阶段提交"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#两阶段提交"}},[t._v("#")]),t._v(" 两阶段提交")]),t._v(" "),_("p",[t._v('为什么必须有"两阶段提交"呢？这是为了让两份日志之间的逻辑一致。')]),t._v(" "),_("div",{staticClass:"custom-block warning"},[_("p",{staticClass:"title"}),_("p",[t._v("bin log 属于归档日志，主要应用在备份和误操作数据恢复中，以及主备复制中使用。\nredo log 属于重装日志，在系统崩溃重启中，只要已写入了redo log就可以恢复到崩溃前的状态。")])]),_("h3",{attrs:{id:"小结"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),_("p",[t._v("redo log 用于保证crash-safe能力。innodb_flush_log_at_trx_commit参数建议设置为1，表示每次事务的redo log 都持久化到磁盘，可以保证Mysql异常重启后数据不丢失。\nsync_binlog这个参数设置为1的时候，表示每次事务的bin log都持久化到磁盘，这个也建议设置为1。\n两阶段提交是跨系统维持数据逻辑一致性时常用的一个方案。")]),t._v(" "),_("p",[t._v("redo log 记录这个页 “做了什么改动”。 bin log 有两种模式，statement格式记录sql语句，row格式会记录行的内容，记两条，更新前和更新后都有。")]),t._v(" "),_("p",[t._v("1 prepare阶段   2 写binlog   3 commit")]),t._v(" "),_("p",[t._v("当在2之前崩溃时：\n重启恢复后发现没有commit，回滚。\n备份恢复时，没有binlog。所以是一致的")]),t._v(" "),_("p",[t._v("当在3之前崩溃时：\n重启恢复：虽没有commit,但满足prepare和bin log完整，所以重启后会自动commit。\n备份恢复：有bin log。所以是一致的")]),t._v(" "),_("p",[t._v("Mysql为了快速响应，所以采用了异步写回磁盘的技术，写入内存就返回，但存在crash之后内存数据丢失的隐患，而redo log 具备crash_safe能力。")]),t._v(" "),_("p",[t._v("如何避免长事务对业务的影响？\n从应用开发端来看：")]),t._v(" "),_("ol",[_("li",[t._v("确认是否使用了 set autocommit=0。")]),t._v(" "),_("li",[t._v("确认是否有不必要的只读事务。")]),t._v(" "),_("li",[t._v("业务连接数据库的时候，根据业务本身的预估，通过 SET MAX_EXECUTION_TIME 命令，来控制每个语句执行的最长时间，避免单个语句意外执行太长时间。\n从数据库端来看：")]),t._v(" "),_("li",[t._v("监控 information_schema.Innodb_trx 表，设置长事务阈值，超过就报警 / 或者 kill；")]),t._v(" "),_("li",[t._v("Percona 的 pt-kill 这个工具不错，推荐使用；")]),t._v(" "),_("li",[t._v("在业务功能测试阶段要求输出所有的 general_log，分析日志行为提前发现问题；")]),t._v(" "),_("li",[t._v("如果使用的是 MySQL 5.6 或者更新版本，把 innodb_undo_tablespaces 设置成 2（或更大的值）。如果真的出现大事务导致回滚段过大，这样设置后清理起来更方便。")])])])}),[],!1,null,null,null);a.default=r.exports}}]);