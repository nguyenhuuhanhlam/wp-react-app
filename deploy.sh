#!/bin/bash

USER="archihau1"
HOST="archihau.edu.vn"
KEY="$HOME/.ssh/id_rsa_archihau"
BASE_DIR="~/public_html/wp-content/themes/wp-react"

echo "[ Building Vite project... ]"
npm run build || { echo "[ Build failed, aborting! ]"; exit 1; }

echo "+ Uploading index.html..."
scp -i "$KEY" dist/index.html ${USER}@${HOST}:${BASE_DIR}/

echo "+ Uploading JS files..."
scp -i "$KEY" dist/js/*.js ${USER}@${HOST}:${BASE_DIR}/assets/js/

echo "+ Uploading CSS files..."
scp -i "$KEY" dist/css/*.css ${USER}@${HOST}:${BASE_DIR}/assets/css/

echo "+ Uploading manifest.json..."
scp -i "$KEY" dist/.vite/manifest.json ${USER}@${HOST}:${BASE_DIR}/.vite/

echo "[ Deployment completed successfully! ]"
