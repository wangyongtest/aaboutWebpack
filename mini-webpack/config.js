
import { JsonLoader } from './loaders/loader.js'
import {Plugin} from './plugins/plugin.js'

export const config = {
  mode: 'development',
  module:{
    rules:[
      {
        test: /\.json$/,
        use: [JsonLoader],
        options:{
          name: 'ey'
        }
      }
    ]
  },
  plugins:[
    // @ts-ignore
    new Plugin()
  ]
}