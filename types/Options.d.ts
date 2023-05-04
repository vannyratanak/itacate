import { ReactElement } from "react";
interface ITheme {
    background: string;
    todayBtn: string;
    clearBtn: string;
    icons: string;
    text: string;
    disabledText: string;
    input: string;
    inputIcon: string;
    selected: string;
}
interface IIcons {
    prev: () => ReactElement | JSX.Element;
    next: () => ReactElement | JSX.Element;
}
export interface IOptions {
    title?: string;
    autoHide?: boolean;
    todayBtn?: boolean;
    todayBtnText?: string;
    clearBtn?: boolean;
    clearBtnText?: string;
    maxDate?: Date;
    minDate?: Date;
    theme?: ITheme;
    icons?: IIcons;
    datepickerClassNames?: string;
    defaultDate?: Date;
    language?: string;
    weekDays?: string[];
}
declare const options: IOptions;
export default options;
//# sourceMappingURL=Options.d.ts.map