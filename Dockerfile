FROM node:22-alpine AS build
WORKDIR /app
# Caps the Angular/esbuild compiler's heap so the build can't OOM a small VM.
ENV NODE_OPTIONS=--max-old-space-size=1024

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# The frontend is a static bundle, so the API URL has to be baked in at build
# time. Passed in by the deploy script once the real public domain is set up;
# defaults to localhost so a plain `docker build` still produces something.
ARG API_URL=https://localhost:7122/v1
RUN sed -i "s#https://localhost:7122/v1#${API_URL}#" src/environments/environment.ts

RUN npm run build

FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/fin-frontend/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
