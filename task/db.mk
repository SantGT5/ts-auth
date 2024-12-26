#----
# Migration
#----

define DB_MIGRATE
    @docker exec -it backend /usr/local/bin/migrate-$(1).sh
endef

migration-up: ## Apply database migrations (up)
	$(call DB_MIGRATE,up)
.PHONY: migration-up

migration-down: ## Revert database migrations (down)
	$(call DB_MIGRATE,down)
.PHONY: migration-down

migration-reapply: migration-down migration-up ## Revert and then re-apply all database migrations
.PHONY: migration-reapply
