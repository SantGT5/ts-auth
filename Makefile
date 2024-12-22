#----
# Imports
#----

include $(wildcard task/*.mk)

#----
# Variables
#----

.DEFAULT_GOAL := help

PROJECT_NAME := user_auth
COMPOSE_PROJECT_NAME := --project-name $(PROJECT_NAME)

COMMON_COMPOSE := -f docker/compose.yaml
DEV_COMPOSE := -f docker/compose.dev.yaml

#----
# Info
#----

urls: ## Show the urls to the running applications
	@echo "*------"
	@echo "* User Auth"
	@echo "*"
	@echo "* Backend: http://localhost:8001"
	@echo "*"
	@echo "* Swagger: http://localhost:8001/swagger"
	@echo "*------\n"
.PHONY: urls
