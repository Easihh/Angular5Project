export interface Topic {
    id: number;
    title: string;
    forumId: number;
    repliesCounter: number;
    author: string;
    locked: boolean;
    sticky: boolean;
    lastUpdated: string;
}
