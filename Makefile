build:
	docker build -t text-exp-app .

run:
	docker run -d -p 8503:80 text-exp-app

