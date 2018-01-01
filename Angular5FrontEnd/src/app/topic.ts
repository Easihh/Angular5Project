export class Topic {
    constructor(
        public id:number,
        public title: string,
        public repliesCounter: number,
        public author: string,
        public lastUpdated: string
    ) {}
}
