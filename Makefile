#!/usr/bin/make -f
# vim: set noet :

#PROJECT		= Mapp

DOMAIN		= soundstream
#EMAIL		= it@nowtaxi.ru

# Имя машины из параметров, либо из консоли
HOSTNAME			?= $(shell hostname)

# Путь и директория проекта
PROJECT_PATH 		?= $(shell pwd)
PROJECT_DIR  		?= $(shell basename "${PROJECT_PATH}")

#DEPLOY_TIMEOUT		?= 120
#PRODUCTION_HOSTS	?= m.nowtaxi.ru
#PRODUCTION_PATH		?= /srv/m
#TEST_HOSTS			?= mtits.nowtaxi.ru
#TEST_PATH			?= ${PRODUCTION_PATH}

# Подключение всех целей
#include /usr/share/nowtaxi/mk/all.mk

update_nginx_config::
	/usr/bin/update_httpd \
		--httpd=nginx \
		--domain=${DOMAIN} \
		--hostname=${HOSTNAME} \
    	> config/httpd/${HOSTNAME}.nginx.conf

update_apache_config::
	/usr/bin/update_httpd \
		--httpd=apache \
		--domain=${DOMAIN} \
		--hostname=${HOSTNAME} \
		> config/httpd/${HOSTNAME}.apache.conf
	
update_apache_cgi_config::
	/usr/bin/update_httpd \
		--httpd=apache \
		--cgi \
		--domain=${DOMAIN} \
		--hostname=${HOSTNAME} \
		> config/httpd/${HOSTNAME}.apache.conf


vars::
	@echo "PROJECT=${PROJECT}"
	@echo "DOMAIN=${DOMAIN}"
	@echo "HOSTNAME=${HOSTNAME}"
	@echo "PROJECT_PATH=${PROJECT_PATH}"
	@echo "PROJECT_DIR=${PROJECT_DIR}"


.PHONY: vars update_nginx_config update_apache_config update_apache_cgi_config
