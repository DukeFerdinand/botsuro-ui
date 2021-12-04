ready:
    docker run --rm --privileged linuxkit/binfmt:v0.8

tag:
	docker tag botsuro-ui registry.dougflynn.dev/botsuro-ui .

build-arm: ready
	docker buildx build --platform linux/arm64 --push -t registry.dougflynn.dev/botsuro-ui .


publish: build-arm
	echo Waiting a few seconds for docker image to upload...
	sleep 10
	kubectl rollout restart deployment -n botsuro botsuro-ui-deployment