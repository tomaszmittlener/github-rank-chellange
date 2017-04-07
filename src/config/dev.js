'use strict';

import baseConfig from './base';

let config = {
  appEnv: 'dev',
  id: '7c89c5830fdc9d616078',
  secret: '2a912d6a5f47c9cffd78c4f335e1286d0c0f7dde',
  apiHost: 'https://api.github.com/'
};

export default Object.freeze(Object.assign({}, baseConfig, config));
