---
layout: post
title: "[CIMS] 1. 라즈베리파이 세팅"
description: >
    CCTV 관제 서비스를 WiFi-Halow를 사용하여 구축하고자 한다.
category: project
tags: [iot]
---

라즈베리파이가 필요한 노드들은 다음과 같다.
* CCTV 노드 3개
* cctv망(halow)와 웹서버(wifi)를 연결할 게이트웨이 1개
* 웹서비스를 구동시킬 웹서버 1개


<!--more-->

# 1.0 기초적인 세팅부터 시작하자.
우선 라즈베리파이 OS를 다운로드 받아보자.
https://www.raspberrypi.com/software/operating-systems/
SD 카드에 Raspberry Pi Imager를 사용해 OS를 굽고, 부팅하면 입력한 세팅대로 운영체제가 설치된다.
임시로 id와 pwd는 각각 모두 cctv3으로 지정해두었다.
참조 : https://ryan-han.com/post/dev/raspberry_server_1/

sudo raspi-config
- 네트워크 연결
Network Options -> Wi-fi Enter SSID and passphrase
iwconfig
/etc/wpa_supplicant/wpa_supplicant.conf
- ssh 연결
Interface Option -> SSH -> YES
ifconfig
wlan0 / inet addr : 일반적으로 192.168.0.xx이다. 본인은 ISEL wifi를 사용했을 떄, 192.168.0.184였다.
(내부망) ssh {id}@{내부 ip}
(외부망) ssh -p {외부포트} {id}@{외부IP 혹은 도메인명}

# 1.1 cctv 노드를 만들어보자.
https://github.com/InternetOfTough/CCTV_HaLow/tree/gRPC


# 1.2 웹서버를 만들어보자.
- nginx
시작에 앞서 apt-get을 최신 상태로 업테이트한다.
apt-get update/upgrade
nginx를 설치한다.
sudo apt-get install nginx
nginx 포트를 변경하지는 않겠다. 곧바로 nginx 서비스를 실행한다.
sudo service nginx start
이후 브라우저 주소창에 [ip]:{port}를 사용하면 다음과 같은 창이 뜬다. 포트를 변경하지 않았다면 ip만 입력해도 된다.
()
참고할만한 명령오로는 nginx 서비스 구동 여부를 확인할 수 있는
service nginx status
사용하고 있는 포트를 확인할 수 있는
netstat -antp
두가지가 있다.

- MySQL 혹은 MariaDB
MariaDB를 설치한다.
sudo apt-get install mariadb-server
설치가 완료되었다면 다음 명령어를 사용하여 각종 보안 설정을 해준다.
sudo mysql_secure_installation

설정을 마친 후, maridb 서비스를 시작한다.
service mariadb start

DB에 접속이 정상적으로 되는지 확인한다. 첫 접속이라면 root로 접속한다.
mysql -u {유저명}

이제 root가 아닌 계정을 생성하고 권한을 부여해주자. 먼저 DB에 접속하여 root가 어떤 권한을 가지고 있는지 확인하겠다.
show grants for current_user;
Tip! DB 명령어는 모두 뒤에 세미콜론 ';' 을 붙인다.
use mysql
grant all privileges on . to '[id]'@'[원격접속권한여부]' identified by '[pwd]' require none with grant option;
show grants for [id]
quit 또는 \q로 DB를 종료하여 생성한 계정으로 접속되는지 확인한다.

- php

- spring boot


# 1.3 게이트웨이를 만들어보자.
게이트웨이는 감사하게도 민주님이 공부해오셨다.