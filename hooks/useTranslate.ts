import { TranslateItem, translateItem } from "@/lib/translate";
import { Dispatch, createContext, useContext } from "react";

// translateItem
const initializeTranslate=translateItem.find(element => element.name == "kh") as TranslateItem ;
type ActionType={type:"kh"|"en"}
const TranslateContext = createContext<TranslateItem>(initializeTranslate);
const TranslateDispatchContext = createContext<Dispatch<ActionType>>(() => null);
function translateReducer(trans:TranslateItem,action:ActionType):TranslateItem{
    if(action.type!=="en"&&action.type!=="kh") return trans;
    return translateItem.find(element=>element.name==action.type) as TranslateItem
}
function dispatchTranslate(){
    return useContext(TranslateDispatchContext)
}
function useTranslate(){
    return useContext(TranslateContext);
}
export {useTranslate,dispatchTranslate,translateReducer,TranslateContext,TranslateDispatchContext,initializeTranslate}