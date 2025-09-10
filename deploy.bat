@echo off
set USER=archihau1
set HOST=archihau.edu.vn
set KEY=C:\Users\NHHL\.ssh\id_rsa_archihau
set BASE_DIR=~/public_html/wp-content/themes/wp-react

echo ?? Uploading index.html...
scp -i %KEY% dist/index.html %USER%@%HOST%:%BASE_DIR%/

echo ?? Uploading JS files...
scp -i %KEY% dist/assets/*.js %USER%@%HOST%:%BASE_DIR%/assets/js/

echo ?? Uploading CSS files...
scp -i %KEY% dist/assets/*.css %USER%@%HOST%:%BASE_DIR%/assets/css/

echo ?? Uploading manifest.json...
scp -i %KEY% dist/.vite/manifest.json %USER%@%HOST%:%BASE_DIR%/.vite/

echo ? Deployment completed successfully!
pause
