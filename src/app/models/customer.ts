export interface Customer {
    // https://resources.fabric.inc/blog/ecommerce-data-model
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    phone: number;
    idCustomerAddress: number;
    created: Date;
}
