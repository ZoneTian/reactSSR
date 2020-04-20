export interface global {
    height?:number
}

export interface ISEO{
    title: string;
    description: string;
    keywords: string;
}
export interface Index {
    first:object,
    BrandAllcon:object
}

export interface IStoreState{
    seo: ISEO,
    global:global,
    index:Index
}