import Controller from '../lib/Controller';
import GhosterDevto from '../lib/adapters/GhosterDevto';

import config from '../config/devto.config';

export default new Controller(new GhosterDevto(config));
