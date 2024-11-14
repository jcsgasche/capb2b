namespace io.gasche;

// using { cuid } from '@sap/cds/common';

entity cuid {
    key ID: UUID;
}

entity Books: cuid {
    title: String;
    author: Association to Authors;
    stock       : Integer;
    }
    
entity Authors: cuid {
    name: String;
    books: Association to many Books on books.author = $self;
}

entity Orders: cuid{ 
    comment : String;
    Items   : Composition of many {
        key pos     : Integer;
        quantity    : Integer;
        book        : Association to Books;
    };
}

// entity OrderItems { // to be accessed through Orders only
//     key parent : Association to Orders;
//     key pos    : Integer;
//     quantity   : Integer;
//     book: Association to Books;
// }
