import fs from "fs";
import * as fastcsv from "fast-csv";
import path from 'path';
import { Product } from "./models/products";

export const populate = async (): Promise<void> => {
    const stream = fs.createReadStream(path.join(process.cwd(), 'src/data/products.csv'));
    const csvData: { name: string; price: string; quantity: string;}[] = [];
    const csvStream = fastcsv.parse().on("data", function(data) {
        csvData.push({
        name: data[0],
        price: data[1],
        quantity: data[2]
        });
    })
    .on("end", function() {
        csvData.shift();
        if(csvData) {
            csvData.forEach(async ({ name, price, quantity }) => {
                const existsProduct = await Product.findOne({ name });
                if (existsProduct) {
                    existsProduct.price = Number(price);
                    existsProduct.quantity = Number(quantity);
                    existsProduct.save();
                } else {
                    const product = new Product();
                    product.name = name;
                    product.price = Number(price);
                    product.quantity = Number(quantity);
                    product.save();
                }
            });
        }
    });
    stream.pipe(csvStream);
}