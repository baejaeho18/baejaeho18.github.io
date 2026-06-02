---
layout: post
title: "[OODP] 9. Classes and Dynamic Memory Allocation"
category: study
tags: [oodp]
---

> POSTECH OODP Lecture at 24SS

# Dynamic Memory and Classes


## Special Member Functions
> default constructor, default destructor, copy constructor, asignment operator, address operator

```c++
class String
{
public:
    String(const char *s);  // constructor
    String();               // default construuctor
    ~String();              // destructor

    // friend function
    friend ostream &operator<<(ostream &os, const String &st); 
}
```

### Copy Constructors
새로운 객체에 기존 객체를 복사할 때 사용한다.

```c++
// What default copy constructor does: shallow copy
String::String(const String& s) { str = s.str; len = s.len; }

String motto("HOHO");
String ditto(motto);
String metoo = motto;
String also = String(motto);
String *pstring = new String(motto);
```
위 코드에서는 copy constructor가 metoo는 motto의 주소를 가리키는 shallow copy를 수행한다.
motto와 metoo의 destructor가 동작하면, 이미 해제된 메모리를 참조하는 metoo의 destructor에서 core dump가 발생하게 될 것이다.
```c++
// Fixing the Problem by Defining an Explicit Copy Constructor
String::String(const String &st) // copy constructor
{
    len = st.len;
    str = new char[len + 1];
    std::strcpy(str, st.str);
    num_strings++;
    cout << num_strings << ": \"" << str << "\" object created\n";
}
```
위와 같이 copy constructor을 수정하여 deep copy를 수행해야 한다.


### Assignment Operators
Copy Constructor와 마찬가지로, default로 shallow copy를 지원하기 때문에 별도로 구현해줄 필요가 있다.

```c++
String &operator=(const String &st);

String &String::operator=(const String &st)
{
    if(this == &st) // object assigned to itself
        return *this;
    delete[] str;
    len = st.len;
    str = new char[len + 1];
    std::strcpy(str, st.str);
    return *this;
}
```


## Questions?
**Q1.** nonmember function이 뭔가요? <br>
**A1.** 

**Q2.**      <br>
**A2.** 


<!-- Links -->
