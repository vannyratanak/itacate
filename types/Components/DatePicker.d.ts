import { ReactElement, ReactNode } from "react";
import { IOptions } from "../Options";
export interface IDatePickerProps {
    children?: ReactElement | ReactNode;
    options?: IOptions;
    onChange?: (date: Date) => void;
    show: boolean;
    setShow: (show: boolean) => void;
    classNames?: string;
    selectedDateState?: [Date, (date: Date) => void];
}
declare const DatePicker: ({ children, options, onChange, classNames, show, setShow, selectedDateState }: IDatePickerProps) => JSX.Element;
export default DatePicker;
//# sourceMappingURL=DatePicker.d.ts.map