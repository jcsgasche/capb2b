using io from '../db/schema';

extend io.gasche.Books with {
    virtual urgency: String;
}

service bookshop {
    entity Books as projection on io.gasche.Books;
    entity Authors as projection on io.gasche.Authors;
    entity Orders as projection on io.gasche.Orders;

    function totalStock() returns Integer;
}
