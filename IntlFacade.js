export default class IntlFacade {
    constructor() {
        this.language = typeof navigator !== 'undefined' ? navigator.language : null;
    }

    withAppLanguage(value) {
        this.appLanguage = value;
        return this;
    }

    withAppRegion(value) {
        this.appRegion = value.toUpperCase();
        return this;
    }
    
    withAppDateTimeFormat(dtFormat) {
        this.appDTFormat = dtFormat;
        return this;
    }

    withAppNumberFormat(numFormat) {
        this.appNumFormat = numFormat;
        return this;
    }

    withAppWeightUnit(weightUnit) {
        this.appWeightUnit = weightUnit.toLowerCase();
        return this;
    }

    withAppDistanceUnit(distanceUnit) {
        this.appDistanceUnit = distanceUnit.toLowerCase();
        return this;
    }

    withAppFluidUnit(fluidUnit) {
        this.appFluidUnit = fluidUnit.toLowerCase();
        return this;
    }

    withAppTempratureUnit(tempratureUnit) {
        this.appTempratureUnit = tempratureUnit.toLowerCase();
        return this;
    }

}

