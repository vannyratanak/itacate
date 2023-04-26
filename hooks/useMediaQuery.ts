import { useEffect, useState } from "react"

const useMediaQuery = (query:string)=>{
    const[matches,setMatches]=useState(false);
    useEffect(()=>{
        let media = window.matchMedia(query);
        console.log(media);
        if(media.matches!==matches){
            setMatches(media.matches);
        }
        let listener = ()=>setMatches(media.matches);
        window.addEventListener("resize",listener);
        return ()=>window.removeEventListener("resize",listener);
    },[matches,query])
    return matches;
}
const useLargeDesktop=()=>{
    const isDesktop = useMediaQuery("(min-width:860px)")
    const isLargeScreen = useMediaQuery("(min-width:1250px)")
    return {isDesktop,isLargeScreen}
}
export {useMediaQuery,useLargeDesktop}