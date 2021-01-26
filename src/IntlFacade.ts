interface Localizable {
  language: string
  region: string
  calender?: string
  dateFormat?: string
  dateTimeFormat?: string
  numberFormat?: {
    decimalIndicator: string
  }
  weightUnit?: string
  distanceUnit?: string
  fluidUnit?: string
  temperatureUnit?: string
}

class NumberL10n {
  numFormat: Intl.NumberFormat;
  numberFormatReplaceRegExp: RegExp;
  decimalIndicator: string;

  constructor (app: Localizable, user: Localizable) {
    this.decimalIndicator = app.numberFormat?.decimalIndicator || '.';
    this.numberFormatReplaceRegExp = new RegExp(`[^0-9${this.decimalIndicator}]`, 'g');
    this.numFormat = new Intl.NumberFormat(`${user.language}-${user.region}`);
  }

  translate (number: number | string) {
    if (typeof number === 'string') {
      number = parseFloat(number.replace(this.numberFormatReplaceRegExp, '').replace(this.decimalIndicator, '.'));
    }
    return this.numFormat.format(number);
  }
}

class IntlFacade {
  number: NumberL10n;

  constructor (number: NumberL10n) {
    this.number = number;
  }

  translateText (text: string) {

  }

  translateNumber (number: number | string) {
    this.number.translate(number);
  }
}

export default class IntlFacadeBuilder {
  app: Localizable = {
    language: 'en',
    region: 'US'
  };
  user: Localizable = {
    language: typeof navigator !== 'undefined' ? navigator.language : 'en',
    region: 'US'
  };

  constructor () {

  }

  withAppLanguage (value: string) {
    this.app.language = value;
    return this;
  }

  withAppRegion (value: string) {
    this.app.region = value.toUpperCase();
    return this;
  }

  withAppDateFormat (dateFormat: string) {
    this.app.dateFormat = dateFormat;
    return this;
  }

  withAppDateTimeFormat (dtFormat: string) {
    this.app.dateTimeFormat = dtFormat;
    return this;
  }

  withAppNumberFormat (decimalIndicator: string) {
    this.app.numberFormat = {
      decimalIndicator
    };
    return this;
  }

  withAppWeightUnit (weightUnit: string) {
    this.app.weightUnit = weightUnit.toLowerCase();
    return this;
  }

  withAppDistanceUnit (distanceUnit: string) {
    this.app.distanceUnit = distanceUnit.toLowerCase();
    return this;
  }

  withAppFluidUnit (fluidUnit: string) {
    this.app.fluidUnit = fluidUnit.toLowerCase();
    return this;
  }

  withAppTemperatureUnit (temperatureUnit: string) {
    this.app.temperatureUnit = temperatureUnit.toLowerCase();
    return this;
  }

  build (): IntlFacade {
    const number = new NumberL10n(this.app, this.user);
    return new IntlFacade(number);
  }
}

