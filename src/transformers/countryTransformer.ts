/* ============
 * Country Transformer
 * ============
 *
 * The transformer for the country.
 */

import Transformer from './transformer';

export default class CountryTransformer extends Transformer {

  static fetch(country: any) {
    return {
      id: `${country.id}`,
      name: country.name,
      code: country.code,
    };
  }
}
