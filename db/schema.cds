namespace io.gasche;

using { cuid } from '@sap/cds/common';

entity Books: cuid {
    title: String;
    author: Association to Authors;    
    }
entity Authors: cuid {
    name: String;
    books: Association to many Books on books.author = $self;
}
