export class Topic {
    constructor(
        public id:number,
        public title: string,
        public replies: number,
        public author: string,
        public timestamp: string
    ) {}
}
