# Node 18 image
FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy frontend code
COPY . .

# Build frontend
RUN npm run build

# Serve build using 'serve'
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]
