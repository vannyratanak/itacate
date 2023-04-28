import { ResponseSurvay } from "@/lib/survay";
import { TableChoosingChoice } from "./TableChoosingForm";
import ChoosingSurvayUI from "./ChoosingSurvay";
import { Suspense } from "react";
import { SkeletonCard } from "./SkeletonCard";

export default function ListingItemSurvay({ data }: { data: ResponseSurvay }) {
    return (
    <>
        <Suspense fallback={<><SkeletonCard/></>}>
        {data.map(value=>{
            if(value.id==1){
                return (<>
                    <TableChoosingChoice data={value}/>
                </>)
            }else{
                return (<>
                    <ChoosingSurvayUI data={value}/>
                </>)
            }
        })}

        </Suspense>
        
    </>)
}