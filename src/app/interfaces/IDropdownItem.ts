export interface IDropdownListItem {
    id: string;
    displayString: string;
    link: string;
}

export interface IDropdownItem{
    id: string;
    title:string;
    items: IDropdownListItem[];
}