(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{587:function(t,a,v){"use strict";v.r(a);var r=v(4),_=Object(r.a)({},(function(){var t=this,a=t.$createElement,v=t._self._c||a;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h2",{attrs:{id:"概述"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[t._v("#")]),t._v(" 概述")]),t._v(" "),v("p",[t._v("索引的出现其实是为了提高数据库的效率，就像书的目录一样。")]),t._v(" "),v("h2",{attrs:{id:"索引常见模型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引常见模型"}},[t._v("#")]),t._v(" 索引常见模型")]),t._v(" "),v("ol",[v("li",[v("p",[t._v("哈希表")]),t._v(" "),v("ul",[v("li",[t._v("以键值对存储数据的结构，把值放在数组中，根据key通过哈希函数找到对应下标，存入value。不可避免的是，多个key值经过哈希函数的换算，会出现同一个值的情况，处理这种情况的一种方法就是，拉出一个链表。哈希适合点查询，不适合区间查询，区间查询会全部扫描一遍。")])])]),t._v(" "),v("li",[v("p",[t._v("有序数组")]),t._v(" "),v("ul",[v("li",[t._v("有序数组在等值查询和范围查询场景中的性能就非常优秀，但其只适用于静态存储，对于更新来说，为了维护有序性，就不那么好用了")])])]),t._v(" "),v("li",[v("p",[t._v("二叉树")]),t._v(" "),v("ul",[v("li",[t._v("二叉树的特点就是：每个节点的左儿子小于父节点，父节点又小于右儿子。其时间复杂度为O(log(N)),为了维持这个时间复杂度，需要保持树为平衡二叉树，为了减少磁盘IO，进而又转变为多叉树，将所有的数据只存在于叶子节点上，故最终选择了B+tree。")])])])]),t._v(" "),v("h2",{attrs:{id:"innodb的索引模型"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#innodb的索引模型"}},[t._v("#")]),t._v(" InnoDB的索引模型")]),t._v(" "),v("p",[t._v("InnoDB采用B+树的数据结构，主键索引的叶子节点存的是整行数据。在 InnoDB 里，主键索引也被称为聚簇索引，非主键索引的叶子节点内容是主键的值。在 InnoDB 里，非主键索引也被称为二级索引。")]),t._v(" "),v("p",[t._v("对于非主键索引查询，它首先回去查普通索引树，得到主键以后，再去聚簇索引中查询整行数据，第二次去查询聚簇索引的行为就称之为回表。")]),t._v(" "),v("h3",{attrs:{id:"索引维护"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引维护"}},[t._v("#")]),t._v(" 索引维护")]),t._v(" "),v("p",[t._v("B+树为了维护索引有序性，在插入新值的时候需要做必要的维护。可能会进行页分裂。\n主键长度越小，普通索引的叶子节点就越小，普通索引占用的空间也就越小，所以，从性能和存储空间方面考量，自增主键往往是更合理的选择。")]),t._v(" "),v("h3",{attrs:{id:"覆盖索引"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#覆盖索引"}},[t._v("#")]),t._v(" 覆盖索引")]),t._v(" "),v("p",[t._v("先在普通索引搜索树上查询，回到主键索引树搜索的过程，我们称为回表。由于查询结果所需要的数据只在主键索引上有，所以不得不回表，所以需要索引优化，避免回表过程，这个优化方法就叫覆盖索引。\n由于覆盖索引可以减少树的搜索次数，显著提升查询性能，所以使用覆盖索引是一个常用的性能优化手段。")]),t._v(" "),v("h3",{attrs:{id:"最左前缀原则"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#最左前缀原则"}},[t._v("#")]),t._v(" 最左前缀原则")]),t._v(" "),v("p",[t._v('这个最左前缀可以是联合索引的最左 N 个字段，也可以是字符串索引的最左 M 个字符，如"where name like ‘张 %’"。')]),t._v(" "),v("p",[t._v("在建立联合索引的时候，如何安排索引内的字段顺序。\n第一原则是，如果通过调整顺序，可以少维护一个索引，那么这个顺序往往就是需要优先考虑采用的。\n第二考虑的原则就是空间。")]),t._v(" "),v("h3",{attrs:{id:"索引下推"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#索引下推"}},[t._v("#")]),t._v(" 索引下推")]),t._v(" "),v("p",[t._v("它会判断满足最左前缀原则的所有条件来过滤第一次的普通索引树搜索，减少回表的次数。（5.6之前的版本只会判断第一个条件然后就回表）")]),t._v(" "),v("h2",{attrs:{id:"小结"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#小结"}},[t._v("#")]),t._v(" 小结")]),t._v(" "),v("p",[t._v("为什么要重建索引？\n索引可能因为删除，或者页分裂等原因，导致数据页有空洞，重建索引的过程会创建一个新的索引，把数据按顺序插入，这样页面的利用率最高，也就是索引更紧凑、更省空间。不论是删除主键还是创建主键，都会将整个表重建。\n使用 alter table T engine=InnoDB 来重建索引")])])}),[],!1,null,null,null);a.default=_.exports}}]);