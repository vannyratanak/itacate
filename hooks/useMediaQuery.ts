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
const useLargeDesktopSmallPhone=()=>{
    const isDesktop = useMediaQuery("(min-width:860px)")
    const isLargeScreen = useMediaQuery("(min-width:1250px)")
    const isSmallPhone=useMediaQuery("('min-height:740px')")
    const isHeightSmall=useMediaQuery("('max-height:600px')")

    return {isDesktop,isLargeScreen,isSmallPhone,isHeightSmall}
}
export {useMediaQuery,useLargeDesktopSmallPhone}