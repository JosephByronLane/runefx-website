interface IDropdownListItemBase {
    id: string;
    displayString: string;
}
interface IScrollToItem extends IDropdownListItemBase {
    scrollTo: string;
    link?: never
}

interface ILinkItem extends IDropdownListItemBase {
    link: string;
    scrollTo?: never;
}

 interface IDropdownListItem {
    id: string;
    displayString: string;
    link: string;
    isExternal?: boolean;
}

export interface IDropdownItem{
    id: string;
    title:string;
    link: string;
    items: IScrollToItem[] | ILinkItem[];
}