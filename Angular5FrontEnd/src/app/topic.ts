export class Topic {
    constructor(
        public id:number,
        public title: string,
        public forumId:number,
        public repliesCounter: number,
        public author: string,
        public locked:boolean,
        public lastUpdated: string
    ) {}
}
