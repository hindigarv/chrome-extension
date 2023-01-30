install:
	npm install
zip: install
	zip -r package.zip manifest.json icons service_worker.js popup content-script.js hindigarv.js node_modules/nukta-remover/index.js node_modules/nukta-remover/src/removeNukta.js node_modules/regex-val-gen/index.js