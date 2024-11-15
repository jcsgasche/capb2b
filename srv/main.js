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
    
    this.on('totalStock', async () => {
      const result = await SELECT .one .from(Books) .columns('sum(stock) as stockTotal');
      return result;
    })

    this.on('stockValue', Books, async (req) => {
      const result = await SELECT 
      .one
      .columns('stock', 'price', 'stock * price as stockValue') 
      .from(Books) 
      .where `ID = ${req.params[0]}`;
      return result.stockValue;
    });

    this.on('setPrice', Books, async req => {
      const id = req.params[0];
      await UPDATE (Books, id) .with ({
        price:req.data.price
      })

      return await SELECT (Books, id);
    })

    // this.on('stockValue', Books, async ({params:[id]}) => {
    //   const result = await SELECT 
    //   . one
    //   .columns('stock', 'price', 'stock * price as stockValue') 
    //   .from(Books) 
    //   .where `ID = ${id}`;
    //   return result.stockValue;
    // });
})

// module.exports = cds.service.impl(function() {
//     console.log("I'm in the anon func.");
//     this.on('READ', 'Books', (_, next) => {
//         console.log("Handling READ of Books");
//         return next();§
//     })
// })

// module.exports = cds.service.impl(function() {
//     console.log("I'm in the anon func.");
//     this.on('READ', 'Books', (_, next) => next() )
// })
