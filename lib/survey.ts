export type ResponseSurvay=ItemResponseSurvay[]
export type ItemResponseSurvay={
    created_at:string,
    updated_at:string,
    id:number,
    name?:string,
    menuOption:menuOptions,
    options:options
}
export type options=option[];
export type option ={id:number,name_en?:string,name_kh?:string}
export type menuOptions=menu[];
export type menu = {id:number,name_en?:string,name_kh?:string,group_option_id:number}