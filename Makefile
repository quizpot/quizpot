dev:
	docker compose -f docker/docker-compose.dev.yml up

local:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.local.yml up

remote:
	docker compose -f docker/docker-compose.yml -f docker/docker-compose.remote.yml up