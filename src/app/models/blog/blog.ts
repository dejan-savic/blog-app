export class Blog {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    text: string;
    categoryId: number;

    constructor() {
        this.id = 0;
        this.createdAt = new Date();
        this.updatedAt = new Date();
        this.title = null;
        this.text = null;
        this.categoryId = 0;
    }
}
