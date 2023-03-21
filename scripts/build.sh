npm run build:clean
npm run build:dist

cp public/index.html dist
cp public/styles.css dist

node scripts/parseDistIndexHtml.mjs
