ready:
    docker run --rm --privileged linuxkit/binfmt:v0.8

tag:
	docker tag botsuro-ui registry.dougflynn.dev/botsuro-ui .

build: ready
	docker buildx build --platform linux/arm64,linux/amd64 --push -t registry.dougflynn.dev/botsuro-ui .


publish: build
	echo Waiting a few seconds for docker image to upload...
	sleep 10
	kubectl rollout restart deployment -n botsuro botsuro-ui-deployment