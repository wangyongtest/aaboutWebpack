export function JsonLoader(source) {
  console.log('jsonLoader--------------',  this.query)
  this.addDeps('jsonLoader')
 
  return `export default ${JSON.stringify(source)}`
}

