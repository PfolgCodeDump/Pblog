---
title: Python 基础语法
description: Python 基础语法和数据类型
order: 2
draft: false
---

# Python 基础语法

## 变量和数据类型

```python
# 基本数据类型
age = 25
height = 1.75
name = "Alice"
is_student = True

# 列表
numbers = [1, 2, 3, 4, 5]

# 字典
person = {
    "name": "Bob",
    "age": 30,
    "city": "Beijing"
}
```

## 控制流

### 条件语句

```python
if age >= 18:
    print("成年人")
else:
    print("未成年人")
```

### 循环

```python
# for 循环
for i in range(10):
    print(i)

# while 循环
count = 0
while count < 10:
    print(count)
    count += 1
```
