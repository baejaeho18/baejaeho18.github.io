---
layout: post
title: "[OODP] 11. Reusing Code in C++"
category: study
tags: [oodp]
---

# Reusing Code (has-a)
## Classes with Member Object (containment)
다른 class의 객체들을 class member로 사용할 수 있다.
이를 **containment**, **composition** 혹은 **layering**이라고 부른다.
예를 들어 Student class에서는 string 객체(name)와 valarray 객체(scores) 등을 사용한다.
<!--more-->

```c++
class Student {
private:
    typedef std::valarray<double> ArrayDb;
    std::string name; // contained object
    ArrayDb scores; // contained object
    // private method for scores output
    std::ostream& arr_out(std::ostream& os) const;
public:
    Student() : name("Null Student"), scores() {}
    explicit Student(const std::string& s) : name(s), scores() {}
    explicit Student(int n) : name ("Nully"), scores(n) {} 
    Student(const std::string& s, int n) : name(s), scores(n) {}
    Student(const std::string& s, const ArrayDb& a) : name(s), scores(a) {}
    Student(const char* str, const double* pd, int n) : name(str), scores(pd, n) {}
    ~Student() {}
    double Average() const;
    const std::string& Name() const;
    double& operator[](int i);
    double operator[](int i) const;
    // friends
    // input
    friend std::istream& operator>>(std::istream& is, Student& stu); // 1 word
    friend std::istream& getline(std::istream& is, Student& stu); // 1 line
    // output
    friend std::ostream& operator<<(std::ostream& os, const Student& stu);
};
```

* valarray template class : <valarray>를 include하여 사용할 수 있는 numeric값들의 배열을 다르는 template class이다.
합산, 최댓값, 최솟값 등의 산술연산을 지원한다.


## Private and Protected Inheritance
### Private Inheritance
Public inheritance(is-a relationship)은 base class의 public method들을 derived class의 public method로 삼아, **interface**를 상속받는다.
반면, private inheritance(has-a relationship)은 base class의 public method들을 derived class의 **private** method로 삼는다. 
이는 containment와 유사한 면이 있다.
![private-inheritance](/assets/img/2024-04-29/private-inheritance.png)

```c++
class Student : private std::string, private std::valarray<double>{
private:
    typedef std::valarray<double> ArrayDb;
    // private method for scores output
    std::ostream& arr_out(std::ostream& os) const;
public:
    Student() : std::string("Null Student"), ArrayDb() {}
    explicit Student(const std::string& s) : std::string(s), ArrayDb() {}
    explicit Student(int n) : std::string("Nully"), ArrayDb(n) {}
    Student(const std::string& s, int n) : std::string(s), ArrayDb(n) {}
    Student(const std::string& s, const ArrayDb& a) : std::string(s), ArrayDb(a) {}
    Student(const char* str, const double* pd, int n)
    : std:: string(str), ArrayDb(pd, n) {}
    ~Student() {}
    double Average() const;
    double& operator[](int i);
    double operator[](int i) const;
    const std::string& Name() const;
    // friends
    // input
    friend std::istream& operator>>(std::istream& is, Student& stu);
    friend std::istream& getline(sted::istream& is, Student& stu);
    // output
    friend std::ostream& operator<<(std::ostream& os, const Student& stu);
};
```
위 코드처럼 **private** keyword를 사용해 상속받는다. 
본 예시처럼 여러 개의 base class로부터 상속받는 것을 **multiple inheritance**라고 부른다.

일반적으로 private inheritance보다는 containment가 훨씬 잘 쓰이는 것이 맞다. 
contained object들을 이름 붙여 명시하면 이해하기도 쉽고 관리하기도 편하다.
private inheritance가 유용한 상황은, base class의 protected member를 사용하거나 virtual 함수들을 재정의(overriding)하고 싶을 경우이다.

### Protected Inheritance
이는 private inheritance와 유사하게 has-a relationship을 지원한다.
**protected** 키워드로 상속받는데, base class의 public과 protected member들이 derived class의 protected member가 된다. 정리하자면 다음과 같다.

### Redefining Access with using
지금까지 base class의 public member들을 private나 protected member로 상속 받는 방법을 알아보았다.
그러나 특정한 base-class method를 derived class에서 publicly 사용하고 싶을 수 있다.

사용할 base-class method를 호출하는 wrapping method 정의하는 방법과, public section에서 using을 사용하여 재정의하는 방법이 있다.

```c++
double Student::sum() const // public Student wrapping method
{
    // use privately-inherited method
    return std::valarray<double>::sum(); 
}

class Student : private std::string, private std::valarray<double>
{
    // ...
public:
    using std::valarray<double>::sum;   // re-define
    // ...
};
```

## Multiple Inheritance
하나 이상의 base class를 상속 받는 관계를 말한다.
Public으로 받는다면 is-a, 그렇지 않다면 has-a 관계로 상속된다.
```c++
class SingingWaiter : public Waiter, Singer { ... };
// Singer is a private base class
```

다중 상속은 주의 깊게 사용되어야한다.
base class들에 동명의 함수들이 있을 수도 있고, 보다 상위에 어떤 base class가 있는지 모른다.
예를 들어, 다음 코드를 보자.
```c++
class Worker
{
private:    
    std::string fullname;
    long id; 
// ...
};
class Waiter : public Worker { ... };
class Singer : public Worker { ... };
class SingingWaiter : public Singer, public Waiter { ... };

SingingWaiter ed;
Worker* pw = &ed; // ambiguous
Worker* pw = (Waiter *)&ed; // the Worker in Waiter
Worker* pw = (Singer *)&ed; // the Worker in Singer
```
위 코드에서 SingingWaiter는 Singer와 Waiter를 상속받는다. 그리고 이 둘은 Worker이기도 한다.
따라서 ed는 두 Worker 객체를 가진다.
어떤 객체를 사용할 것인지 typecast를 해줘야 한다.

이러한 불상사를 막기 위해 virtual base class를 사용한다.

## virtual base classes
동일한 base class를 공유하는 둘 이상의 class가 상속될 때, 공통된 객체 하나만 내려보내는 방식이다.
```c++
class Singer : virtual public Worker { ... };
class Waiter : public virtual Worker { ... };
class SingingWaiter : public Singer, public Waiter { ... };

SingingWaiter ed;
Worker* pw = &ed; // no longer ambiguous
```
이제 SingingWaiter는 하나의 Worker 객체만을 가진다. Singer과 Waiter객체가 공통된 Worker 객체를 공유하기 떄문이다.

그러나 virtual base class가 만능의 해답은 아니다. 떄로는 여러 base 객체를 각자 가져야하는 경우도 있고, 때로는 virtual 때문에 오히려 문제가 생기는 경우도 있다.

### New Constructor Rules
그러한 문제 중 하나가 기존 constructor rule을 사용하면 오류가 난다는 것이다. 그래서 C++은 new constructor rules를 제공한다.
```c++
SingingWaiter(const Worker& wk, int p = 0, int v = Singer::other)
: Waiter(wk, p), Singer(wk, v) {} // flawed

SingingWaiter(const Worker& wk, int p = 0, int v = Singer::other)
: Worker(wk), Waiter(wk, p), Singer(wk, v) {}
```


## Questions?
**Q1.**    <br>
**A1.** 

**Q2.**      <br>
**A2.** 

<!-- Links -->
[students]: