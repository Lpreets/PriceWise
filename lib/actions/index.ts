"use server"

import { revalidatePath } from "next/cache";
import Product from "../models/product.model";
import { connectToDB } from "../mongoose";
import { scrapedAmazonProduct } from "../scraper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";

export async function scrapeAndStoreProduct(productUrl: string) {
    if(!productUrl) return;

    try {
        connectToDB();

        const scrapedProduct = await scrapedAmazonProduct(productUrl);

        if(!scrapedProduct) return;

        let product = scrapedProduct;

        const existingProduct = await Product.findOne({ url: scrapedProduct.url});

        if(existingProduct) {
            const updatePriceHistory: any = [
                ...existingProduct.priceHistory,
                { price: scrapedProduct.currentPrice}
            ]

            product = {
                ...scrapedProduct,
                priceHistory: updatePriceHistory,
                lowestPrice: getLowestPrice(updatePriceHistory),
                highestPrice: getHighestPrice(updatePriceHistory),         
                averagePrice: getAveragePrice(updatePriceHistory),  
            }

        }

        const newProduct = await Product.findOneAndUpdate({
            url: scrapedProduct.url },
            product,
            { upsert: true, new: true }
        );

        revalidatePath(`/products/${newProduct._id}`)

        
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error}`)
    }
}

export async function getProductById(productId: string) {
    try {
        connectToDB();

        const product = await Product.findOne({_id: productId});

        if(!product) return null;

        return product;
    } catch (error) {
        
    }
}