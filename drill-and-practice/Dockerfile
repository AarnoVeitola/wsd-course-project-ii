FROM denoland/deno:alpine-1.37.0

EXPOSE 10000

WORKDIR /app

COPY deps.js .

RUN deno cache deps.js

COPY . .

CMD ["deno", "run", "--unstable", "--allow-net", "--allow-read", "--allow-env", "--no-check", "app-launch.js"]
