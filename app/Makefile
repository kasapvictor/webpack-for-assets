install:
	npm ci || npm install

rm-rf-dist:
	rm -rf dist

server:
	NODE_ENV=development npx webpack serve

pretty:
	npx prettier --write src/scss && npx prettier --write src/js

lint:
	npx eslint --fix src/js

pre-commit: pretty lint

build-prod: rm-rf-dist pretty lint
	NODE_ENV=production npx webpack --mode production

build-dev: rm-rf-dist
	NODE_ENV=development npx webpack --mode development

watch: rm-rf-dist
	NODE_ENV=development npx webpack --watch

# for browser-sync
browser:
	npx browser-sync --watch --no-notify --port 4000 --host 0.0.0.0 public
