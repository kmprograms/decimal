import {Request, Response} from 'express';
import {Decimal} from 'decimal.js';

class Product {

    constructor(
        private name: string, 
        private price: Decimal, 
        private quantity: number,
        private discount: Decimal) {}

    changeDiscount = (newDiscount: Decimal): void => {
        if (newDiscount.cmp(new Decimal('0.0')) >= 0 && newDiscount.cmp(new Decimal('1.0')) <= 0) {
            this.discount = newDiscount;
        }
    }

    totalPrice = (): Decimal => this.price.mul(new Decimal(this.quantity))
                                          .mul(new Decimal('1.0').sub(this.discount));
}

export class Routes {
    
    public routes(app): void {

        // localhost:3000/t1
        app.route('/t1').get((req: Request, res: Response) => {

            // mozem dokonywac konwersji z danych o roznej postaci

            console.log('------------------------- 1 -------------------------');

            const d1 = new Decimal(123.22);
            console.log(d1);

            const d2 = new Decimal('1232e-2');
            console.log(d2);

            const d3 = new Decimal(d1);
            console.log(d3);

            const d4 = new Decimal('0xa.2f');
            console.log(d4);

            const d5 = new Decimal('0b1011.11');
            console.log(d5);

            // mozemy konwertowac typ Decimal do innych typow / formatow

            console.log('------------------------- 2 -------------------------');

            console.log(d1.toBinary());
            console.log(d1.toBinary(10));
            console.log(d1.toHex());
            console.log(d1.toOctal());


            // na obiektach  mozna wykonywac szereg operacji
            // Decimal is immutable

            console.log('------------------------- 3 -------------------------');
            
            const d10 = new Decimal('2.50');
            const d11 = new Decimal('1.25');

            const res1 = d10.plus(d11).mul(new Decimal('2.0'));
            console.log(res1);

            // niektore metody maja swoje skrocone aliasy
            // praktycznie wszystkie metody z biblioteki Math maja tutaj swoja wersje
            const res2 = new Decimal('6.25').squareRoot().dividedBy(new Decimal('2.0'));
            console.log(res2);

            const res3 = new Decimal('6.25').sqrt().div(new Decimal('2.0'));
            console.log(res3);

            
            console.log('------------------------- 4 -------------------------');

            // porownywanie Decimal

            const d20 = new Decimal('1.21');
            const d21 = new Decimal('2.21');
            const d22 = new Decimal('2.21');

            console.log(d20.comparedTo(d21));
            console.log(d21.cmp(d20));
            console.log(d21.cmp(d22));

            console.log('------------------------- 5 -------------------------');

            // zaokraglanie

            const d30 = new Decimal('211.235178112');

            console.log(d30.toExponential(4));
            console.log(d30.toFixed(10));
            console.log(d30.toPrecision(5));

            console.log('------------------------- 6 -------------------------');

            // obsluga NaN oraz Infinity

            const d40 = new Decimal(NaN);
            const d41 = new Decimal(Infinity);

            console.log(d40.isNaN());
            console.log(d41.isFinite());


            console.log('------------------------- 7 -------------------------');

            // ustawienia zaawansowane

            Decimal.set({precision: 5, rounding: 4});
            const d50 = new Decimal('5.0');
            const d51 = new Decimal('3.0');
            console.log(d50.div(d51)); // wyswietlanie z zachowaniem ustalonej precyzji

            console.log('------------------------- 8 -------------------------');

            // przyklad zastosowania - klasa Product

            const product = new Product('TABLE', new Decimal('250'), 10, new Decimal('0.2'));
            product.changeDiscount(new Decimal('0.1'));
            console.log(`Total price = ${product.totalPrice()} `);

            console.log('------------------------- 9 -------------------------');

            // inne biblioteki o podobnym przeznaczeniu
            
            // https://github.com/MikeMcl/decimal.js/
            // https://github.com/MikeMcl/bignumber.js/
            // https://github.com/MikeMcl/big.js/
            // https://github.com/MikeMcl/big.js/wiki


            res.status(200).send({
                message: 'T1'
            });
        });
    }
}