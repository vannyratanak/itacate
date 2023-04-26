export type TranslateItem={
    name:string,
    menu:{
        languageButton:string,
        name:string,
        phone:string,
        date_visit:string,
        title_tell_us:string,
    }
}
export const lang=[
    "ខ្មែរ",
    "English"
]
export const translateItem: TranslateItem[]=[
    {
        name:"kh",
        menu:{
            languageButton:"ខ្មែរ",
            name:"ឈ្មោះ",
            phone:"លេខទូរសព្ទ",
            date_visit:"កាលបរិច្ឆេទនៃដំណើរទស្សនកិច្ច:",
            title_tell_us:"ប្រាប់យើងអំពីដំណើរទស្សនកិច្ចរបស់អ្នក។"
        }
    },
    {
        name:"en",
        menu:{
            languageButton:"English",
            name:"Name",
            phone:"Phone Number",
            date_visit:"Date of visit",
            title_tell_us:"Tell us about your visit."
        }
    }
]
export const titleLogo={
    title:"ITACATE",
    sub_title:"AUTHENTIC MEXICAN \n CUISINE",
    cuisine:"",
    bottomLogo:"Customer's Satisfaction Survey"

}