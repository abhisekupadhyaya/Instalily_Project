.PHONY: build up down logs clean

build:
	docker compose build

up:
	docker compose up -d

pull-model:
	docker exec ollama ollama pull llama3.2:3b

down:
	docker compose down

logs:
	docker compose logs -f

clean:
	docker compose down -v
	docker volume rm instalily_ollama instalily_volumedb
	docker builder prune -af

all: build up pull-model