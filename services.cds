using { cuid, managed, Country} from '@sap/cds/common';

service bookshop{
    entity Books: cuid, managed {
        title: String;
        madeIn: Country;
    }
    entity Authors: cuid {
        name: String;
        countryOfBirth: Country;
    }
}
