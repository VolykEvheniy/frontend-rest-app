import * as pages from './pages';
import config from 'config';

const result = {
  [pages.defaultPage]: `${config.UI_URL_PREFIX}/${pages.defaultPage}`,
  [pages.login]: `${config.UI_URL_PREFIX}/${pages.login}`,
  [pages.secretPage]: `${config.UI_URL_PREFIX}/${pages.secretPage}`,
  [pages.carsPage]: `${config.UI_URL_PREFIX}/${pages.carsPage}`,
  [pages.carDetailPage]: `${config.UI_URL_PREFIX}/${pages.carsPage}/${pages.carDetailPage}`,
};

export default result;
