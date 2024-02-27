export interface IFAQ {
    title: string;
    children: IFAQChild[];
}

export interface IFAQChild {
    title: string;
    description: string;
}
