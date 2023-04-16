const fs = require('fs')
const path = require('path')

const loadGeneratedPath = path.resolve(__dirname, '../graphql/generated.ts')

fs.writeFileSync(
  loadGeneratedPath,
  fs
    .readFileSync(loadGeneratedPath, 'utf8')
    .replace(/@vue\/composition-api/m, 'vue')
)
