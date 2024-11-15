using io from '../db/schema';

extend io.gasche.Books with {
    virtual urgency: String;
}

service bookshop {
    // entity Books as select from io.gasche.Books where stock > 12;
    entity Books as projection on io.gasche.Books 
        actions {
            function stockValue() returns Integer;
            action setPrice(price: Integer) returns Books;
        };
    entity Authors as projection on io.gasche.Authors;
    entity Orders as projection on io.gasche.Orders;

    function totalStock() returns Integer;
}
