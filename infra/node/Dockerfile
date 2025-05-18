FROM node:22.15.1

ARG UID=1000
ARG GID=1000

RUN <<EOF
  apt-get update
  apt-get install -y vim less bash
  rm -rf /var/lib/apt/lists/*
  userdel node
  groupadd --gid $GID noder
  useradd --uid $UID --gid $GID --create-home noder
  mkdir -p /code
  chown -R noder:noder /code
EOF

WORKDIR /code

USER noder
