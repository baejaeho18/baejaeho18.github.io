---
layout: post
title: "[OODP] 9. Classes and Dynamic Memory Allocation(2)"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

## Special Member Functions
> default constructor, default destructor, copy constructor, asignment operator, address operator

```c++
class String
{
public:
    String(const char *s);  // constructor
    String();               // default construuctor
    ~String();              // destructor
    String(const String& s);// copy constructor

    // friend function
    friend ostream &operator<<(ostream &os, const String &st);

    // assignment operator
    String &operator=(const String &st);
};
```

### Additional member fuctions
```c++
class String
{
private:
    static int num_strings;
    // ...
public:
    // ...
    int length() const { return len; }

    // overloaded operator methods
    String &operator=(const char *);
    char &operator[](int i);            // read-write
    const char &operator[](int i) const;// read-only

    // overloaded operator friends
    friend bool operator<(const String &st1, const String &st2);
    friend bool operator>(const String &st1, const String &st2);
    friend bool operator>=(const String &st1, const String &st2);
    friend bool operator<=(const String &st1, const String &st2);
    friend bool operator==(const String &st, const String &st2);
    friend bool operator!=(const String &st, const String &st2);
    friend std::istream& operator>>(std::istream &is, String &st);
    
    // static function
    static int HowMany();
};
```

> 위의 예제처럼 member function으로 overloading하면 굳이 **friend** 키워드를 사용하지 않아도 구현할 수 있다.

* Comparison Members

* using Bracket Notation

* Static class member functions

```c++
int String::HowMany()
{
    return num_strings;
}
```
각 객체에 관계 없이 class 전체에 대해 작용하는 함수이다.
당연히, static data members만 사용한다.


* Further assignment operator overloading

```c++
String(const char *s)

String &String::operator=(const char *s)
{
    delete[] str;
    len = std::strlen(s);
    str = new char[len + 1];
    std::strcpy(str, s);
    return *this;
}

String name;
char temp[40] = "OOP";
name = temp;            // use constructor => assignment operator
```
본래 상단의 생성자를 사용할 경우에는 type conversion으로 임시로 String 객체가 만들어서 name에 복사한 후, 사용된 임시 객체를 제거한다.
assignment operator를 사용하면 이러한 번거로운 과정 없이 곧바로 String 객체를 생성할 수 있다.
그러나 항상 constructor에서 **new**를 사용했다면 **delete**하는 것을 잊지 말라.

이렇게 String의 모든 동작을 문제 없이 구현했다면, String 객체는 built-in variable처럼 사용할 수 있다.
이제 String을 사용한 보다 상위의 객체에서는 String 객체의 복잡한 내부 구현을 신경쓰지 않아도 되는 것이다.

### Member Initializer List

``` c++
class Classy
{
    int mem1 = 10;          // in-class initialization
    const int mem2 = 20;    // in-class initialization
    const int mem3;

    Classy(int n);
};

Classy::Classy(int n) : mem1(n), mem3(20)
{ 
    // ...
};
```
객체를 생성할 때, 특정 member data을 원하는 값으로 초기화하고 싶다면 initializer list를 사용할 수 있다.
만약 어떤 member data를 const로 선언했다면, 생성 이후에는 바꿀 수 없기 떄문에 initializer list를 사용해 초기화해줘야만 한다.
또한, member data 선언할 때 초기화한 값과 생성자에서 초기화하 값이 충돌할 수 있다. 이런 경우에는 생성자에서 초기화한 값을 우선으로 한다.

## Questions?
**Q1.** nonmember / member / friend function의 정의가 헷갈립니다. <br>
**A1.** 

**Q2.**      <br>
**A2.** 


<!-- Links -->
