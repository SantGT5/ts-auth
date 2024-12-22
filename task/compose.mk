#----
# Compose
#----

define RUN_COMPOSE
    @docker compose $(COMMON_COMPOSE) $(1) $(COMPOSE_PROJECT_NAME) up --build
endef

start/dev: urls ## Start dev environment
	$(call RUN_COMPOSE, $(DEV_COMPOSE)) $(arg)
.PHONY: start/dev
