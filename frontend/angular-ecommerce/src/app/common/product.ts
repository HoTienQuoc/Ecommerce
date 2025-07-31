export class Product {
    constructor(
        public sku: String,
        public name: String,
        public description: String,
        public unitPrice: Number,
        public imageUrl: String,
        public active: Boolean,
        public unitsInStock: Number,
        public date_created: Date,
        public last_updated: Date
    ){

    }
}
