# chrome-extension


### How to install on local chrome

- run `npm install`
 
- Follow [these instructions](https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked)


## How to deploy on Chrome web store
- Run `make zip`. It will create `package.zip` file 
- Go to [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) 
  - Select `हिन्दी गर्व` 
  - Navigate to `Build -> Package`
  - Click on `Upload new package` button
  - Upload the `package.zip` file
  - Navigate to `Build -> Store listing`
  - Click on `Submit for review` button


## TODO
- use maskable icons


## Versions

### 2.0.0
- Load data from Google Drive instead of hard coded csv file.
### 2.1.0
- Auto reload Google Drive file every day