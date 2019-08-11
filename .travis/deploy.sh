#!/usr/bin/env bash
ssh root@$HOST_IP <<EOD
echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin
docker pull $IMAGE_NAME
docker stop $CONTAINER_NAME || true && docker rm $CONTAINER_NAME || true
docker run -e VIRTUAL_HOST=www.$VIRTUAL_HOST,$VIRTUAL_HOST -e LETSENCRYPT_HOST=$VIRTUAL_HOST -d --name $CONTAINER_NAME $IMAGE_NAME
if [ "$(docker ps -q -f name=nginx)" ]; then
  docker exec nginx nginx -s reload
fi
EOD
