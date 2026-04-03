dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up --watch

local:
	docker compose -f docker-compose.yml -f docker-compose.local.yml up

remote:
	docker compose -f docker-compose.yml -f docker-compose.remote.yml up