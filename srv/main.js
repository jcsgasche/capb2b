const cds = require('@sap/cds');

const logger = cds.log('capb2b');

const { Books } = cds.entities('bookshop')

module.exports = cds.service.impl(function() {
    const changeUrgencyDueToSubject = (data) => {
        if (data) {
          const books = Array.isArray(data) ? data : [data];
          books.forEach((book) => {
            if (book.title?.toLowerCase().includes("ga")) {
              book.urgency = "HIGH";
            }
          });
        }
    }

    // this.after('READ', 'Books', (data, req) => {
    //     changeUrgencyDueToSubject(data);
    // })
    this.after('READ', 'Books', changeUrgencyDueToSubject)
    
    this.on('totalStock', () => 99)
})

// module.exports = cds.service.impl(function() {
//     console.log("I'm in the anon func.");
//     this.on('READ', 'Books', (_, next) => {
//         console.log("Handling READ of Books");
//         return next();
//     })
// })

// module.exports = cds.service.impl(function() {
//     console.log("I'm in the anon func.");
//     this.on('READ', 'Books', (_, next) => next() )
// })
