---
title: C++ 基础语法
description: C++ 基础语法和数据类型
order: 2
draft: false
---

# C++ 基础语法

## 变量和数据类型

```cpp
// 基本数据类型
int age = 25;
float height = 1.75f;
double pi = 3.14159265359;
char grade = 'A';
bool isStudent = true;

// 字符串
std::string name = "Alice";
```

## 控制流

### 条件语句

```cpp
if (age >= 18) {
    std::cout << "成年人" << std::endl;
} else {
    std::cout << "未成年人" << std::endl;
}
```

### 循环

```cpp
// for 循环
for (int i = 0; i < 10; i++) {
    std::cout << i << std::endl;
}

// while 循环
int count = 0;
while (count < 10) {
    std::cout << count << std::endl;
    count++;
}
```
