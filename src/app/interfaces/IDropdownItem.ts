export interface IDropdownListItem {
    id: string;
    displayString: string;
    link: string;
    isExternal?: boolean;
}

export interface IDropdownItem{
    id: string;
    title:string;
    link: string;
    items: IDropdownListItem[];
}