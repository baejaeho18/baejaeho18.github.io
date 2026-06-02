---
layout: post
title: "[CIMS] 3. DB와 연동하기(1)"
category: project
tags: [iot]
---

> CCTV 노드들의 상태와 실시간 영상 스트리밍을 위한 웹 인터페이스 구축

# 3.1 JPA & Mybatis
> [Mybatis와 JPA 비교]를 참고하라.

MyBatis 프레임워크는 반복적인 JDBC 프로그래밍을 단순화하여, 불필요한 Boilerplate 코드를 제거하고, Java 소스코드에서 SQL문을 분리하여 별도의 XML 파일로 저장하고, 이 둘을 서로 연결시켜주는 기능을 제공한다. 개발자는 Java 메소드 선언과 SQL문만 만들면 MyBatis가 자동으로 그 둘을 매핑시킨다.
Dynamic SQL 생성 기능을 제공하여 프로그램 실행 중에 입력되는 파라미터에 따라 서로 다른 SQL문을 동적으로 생성해 내는 기능을 제공한다.

JPA(Java Persistence API)는 Java 객체와 관계형 데이터베이스 간의 매핑을 위한 API다. JPA는 ORM(Object-Relational Mapping)을 구현하는 자바 표준 스펙으로, 개발자가 객체지향 프로그래밍 언어에서 사용하는 객체 모델과 관계형 데이터베이스의 테이블 간의 매핑을 자동으로 처리해준다. 
개발자는 SQL문을 작성할 필요가 없어지고, DB가 바뀌어도 DB에 따라 새로운 SQL을 작성할 필요가 없이 Hibernate와 같은 프레임워크에서 DB에 맞는 적합한 SQL문을 생성해준다.

<!--more-->

MyBatis와 JPA 모두 DB를 사용할 때 번거로운 반복작업을 줄여준다. MyBatis는 SQL문을 Java와 분리하여 별도 파일로 관리할 수 있어 SQL 개발과 유지 보수에 용이하고, JPA는 SQL문을 아예 만들 필요가 없기 때문에 더욱 자동화되어 반복작업을 극적으로 줄여준다.

Mybatis는 개발자가 SQL을 직접 작성하고 최적화할 수 있다. 또한 복잡한 쿼리 또는 특정 데이터베이스에 최적화된 쿼리 작성이 필요한 경우에 적합하다. 물론 index와 join과 같은 SQL문에 대한 이해가 뒷받침되어야 효과적으로 제어할 수 있다.
한편, JPA는 객체와 데이터베이스 간의 자동 매핑을 지원하기 때문에 별도의 SQL 작성을 필요로 하지 않는다. 테이블 간의 연관 관계와 객체 간의 연관 관계를 쉽게 다룰 수 있어 객체 지향적 개발에 어울리며, DB 종류에 종속적이지 않게 SQL이 자동으로 작성된다. 다만 JPA 작성법(@Entitity, @Table, @Column, @Id, @OneToMany, @ManyToOn)과 발생하는 이슈(즉시 로딩, 지연 로딩, 영속성 전이, 복합키 매핑 등)에 대해 익혀야 한다.

본 프로젝트는 작은 테이블에서 적은 sql 요청을 보낼 것이다. 따라서 프레임워크에 대한 이해를 하고 싶다면 JPA를 고르고, sql에 대한 간단히 복습만 하고 싶다면 Mybatis를 선택하면 될 것 같다.
JPA를 더 공부하고 만들기에는 시간이 부족하기에 우선 Mybatis로 동작하는 것을 목표로 하고, 차후 JPA로 대체해보도록 하겠다.
그런데 막상 쓰다보면 Mybatis와 JPA를 같이 사용하게 될 수도 있다.

# 3.2 MySQL statements
MySQL 공식 웹사이트에서 서버를 [다운로드](https://dev.mysql.com/downloads/) 받을 수 있다. MySQL 서버를 관리하는 GUI 도구인 MySQL 워크벤치를 [다운로드](https://www.mysql.com/products/workbench/) 받아 사용하겠다.
워크벤치에서 MySQL 서버에 연결한 후, 'Create a new schema' 아이콘을 클릭하여 스키마를 생성한다. 생성된 스키마를 오른쪽 클릭하여 'Create Table'을 선택한다. SQL문은 다음과 같다.
```sql
CREATE SCHEMA cims;

CREATE TABLE cctv (
    id VARCHAR(10) PRIMARY KEY,
    name VARCHAR(10),
    videoUrl VARCHAR(255),
    storagePath VARCHAR(255),
    xCoordinate DOUBLE,
    yCoordinate DOUBLE,
    networkStat INT,
    cameraValid BOOLEAN,
    emergency INT
);

CREATE TABLE member (
    hashcode INT PRIMARY KEY,
    name VARCHAR(10),
    id VARCHAR(10),
    pwd VARCHAR(20),
    valid BOOLEAN,
    userRole VARCHAR(10) 
);
```

* Insert 문을 상황별로 작성한다.

Member의 PostConstructor의 역할을 할 insert 문이다. default 계정인 user과 admin을 저장한다.
```sql
INSERT INTO member (hashcode,name,cctvmemberhashcode id, pwd, valid, userRole) VALUES
(1, 'user', 'user', '$2a$10$68uVM9w9GJNQt0hXH.t/m.KPz9QmTshd8TPPKZ2BFsH.F9l5lZ4bC', true, 'ROLE_USER'),
(2, 'admin', 'admin', '$2a$10$68uVM9w9GJNQt0hXH.t/m.KPz9QmTshd8TPPKZ2BFsH.F9l5lZ4bC', true, 'ROLE_ADMIN');
```
CCTV의 PostConstructor의 역할을 할 insert 문이다. ccrv1, cctv2를 저장한다.
```sql
INSERT INTO cctv (id, name, videoUrl, storagePath, xCoordinate, yCoordinate, networkStat, cameraValid, emergency) VALUES
('cctv1', 'cctv1', '', 'videos/cctv1.mp4', 36.104359, 129.385868, 3, true, 0),
('cctv2', 'cctv2', '', 'videos/cctv2.mp4', 36.104959, 129.385698, 2, true, 0);
```
회원가입을 통해 새로운 Member를 추가하는 insert문이다.
```sql
INSERT INTO member (hashcode, name, id, pwd, valid, userRole) VALUES
(#{hashId}, #{memberName}, #{id}, #{hashedPassword}, true, 'ROLE_USER');
```
CCTV 노드를 추가하는 sql문이다.
```sql
INSERT INTO cctv (id, name, videoUrl, storagePath, xCoordinate, yCoordinate, networkStat, cameraValid, emergency) VALUES
(#{cctvId}, #{cctvName}, #{videoUrl}, #{storagePath}, #{xCoordinate}, #{yCoordinate}, #{networkStat}, #{cameraValid}, #{emergency});
```

* Update 문을 상황별로 작성한다.

Member 계정 중 ROLE_USER이 ROLE_ADMIN으로 승급하는 sql문이다.
```sql
UPDATE member SET userRole = 'ROLE_ADMIN' WHERE id = #{userId};
```
Member 계정 중 휴면계정으로 전환되어 valid가 false로 바뀌는 sql문이다.
```sql
UPDATE member SET valid = false WHERE id = #{dormantUserId};
```
CCTV의 위치 좌표가 바뀌어 xCoordinate와 yCoordinate가 바뀌는 sql문이다.
```sql
UPDATE cctv SET xCoordinate = #{xCoordinate}, yCoordinate = #{yCoordinate} WHERE id = #{cctvId};
```
CCTV의 name을 바꾸는 sql문이다.
```sql
UPDATE cctv SET name = #{CCTVName} WHERE id = #{cctvId};
```
CCTV가 주기적으로 보내는 meta data(networkStat, cameraValid, emergency)를 저장하기 위한 sql문이다.
```sql
UPDATE cctv SET networkStat = #{networkStat}, cameraValid = #{cameraValid}, emergency = #{emergency} WHERE id = #{cctvId};
```

* Delete 문을 상황별로 작성한다.

Member 계정 중 삭제되어 DB에서 drop하는 sql문이다.
```sql
DELETE FROM member WHERE id = #{deletedMemberId};
```
CCTV 중 더이상 사용되지 않는 노드여서 drop하는 sql문이다.
```sql
DELETE FROM cctv WHERE id = #{deletedCctvId};
```

# 3.2 Setting for Mybatis
> [Mybatis 연동] 블로그를 참고하였다.

1. build.gradle에 Mybatis-spring-boot-starter 의존성 추가한다.
```xml
dependencies {
        implementation 'org.mybatis.spring.boot:mybatis-spring-boot-starter:2.2.0'
}
```
2. application.properties(or .yml)에 DB 연결 정보와 Mybatis 설정을 추가
```xml
spring.datasource.url=jdbc:mysql://localhost:3306/cims?serverTimezone=UTC&characterEncoding=UTF-8
spring.datasource.username=bjh
spring.datasource.password=1749
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
mybatis.type-aliases-package=com.example.demo.domain
mybatis.mapper-locations=classpath:mapper/*.xml
```
이때 schema 명(cims)와 계정명(bjh), 계정암호(1749)는 workbench에서 생성한 schema와 계정에 따른다.
이때, 입력한 계정의 권한을 꼭 설정해줘야 한다.
![user-privileges](/assets/img/2024-02-28/user-privileges.png)
또한 localhost가 아닌 정식 domain을 얻고 배포한다면, 반드시 마스킹하는 것을 잊지말라.

> 1번과 2번은 반드시 atomic하게 이뤄져야 한다. 그렇지 않으면 [Failed to configure a DataSource]를 만나게 될 것이다.

3. Domain object와 Mapper Interface, Mapper XML file 작성

CCTV mapper

Member mapper


<!-- Links -->
[Mybatis와 JPA 비교]: https://www.elancer.co.kr/blog/view?seq=231
[Mybatis 연동]: https://engineerinsight.tistory.com/219
[Failed to configure a DataSource]: https://psip31.tistory.com/139