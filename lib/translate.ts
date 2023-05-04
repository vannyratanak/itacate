export type TranslateItem = {
    name: string,
    menu: {
        languageButton: string,
        name: string,
        phone: string,
        name_placeholder: string,
        phone_placeholder: string,
        date_visit: string,
        title_tell_us: string,
        feeback_message: string,
        restuarant: string,
        contact: {
            phone: string,
            email: string,
        },
        error:{
            username:string,
            phone_required:string,
            phone_format:string,
            choose:string,
            another_choice:string,
        }
        comment:string,
        choose_following:string,
    }
}
export const lang = [
    "ខ្មែរ",
    "English"
]
export const translateItem: TranslateItem[] = [
    {
        name: "kh",
        menu: {
            error:{
                username:"សូមបញ្ចូលឈ្មោះ",
                phone_required:"សូមបញ្ចូលលេខទូរស័ព្ទ",
                phone_format:"លេខទួរស័ព្ទមិនត្រូវទម្រង់",
                choose:"សូមជ្រើសរ់ើសចម្លើយខាងក្រោម",
                another_choice:"សូមជ្រើសរ់ើសចម្លើយ",
            },
            choose_following:"Please choose the best answer for each of the following.",
            restuarant: "Was this your first visit to our restaurant?",
            languageButton: "ខ្មែរ",
            name: "ឈ្មោះ",
            name_placeholder: "សីហា មង្គល",
            phone_placeholder: "000 000 000",
            phone: "លេខទូរសព្ទ",
            date_visit: "កាលបរិច្ឆេទនៃដំណើរទស្សនកិច្ច:",
            title_tell_us: "ប្រាប់យើងអំពីដំណើរទស្សនកិច្ចរបស់អ្នក។",
            feeback_message: "Your feedback is appreciated. We hope you know \n that your input will help us improve our service! \n Thank you for your effort in completing this survey.\n Feel free to let us know if you have any more \n comments or suggestions.",
            contact: {
                phone: "លេខទូរសព្ទ : 096 561 9575",
                email: "អុីម៉ែល: itacate.phnompenh@gmail.com"

            },

            comment:"Comments & Suggestions"
        }
    },
    {
        name: "en",
        menu: {
            choose_following:"Please choose the best answer for each of the following.",
            restuarant: "Was this your first visit to our restaurant?",
            languageButton: "English",
            name: "Name",
            error:{
                username:"Name is required",
                phone_required:"Phone Number is required",
                phone_format:"Please input valid phone number",
                choose:"Please choose the answer",
                another_choice:"Please choose answer",
            },
            phone: "Phone Number",
            name_placeholder: "TOM CRUISE",
            phone_placeholder: "000 000 000",
            date_visit: "Date of visit",
            title_tell_us: "Tell us about your visit.",
            feeback_message: `Your feedback is appreciated. We hope you know
            that your input will help us improve our service!
            Thank you for your effort in completing this survey.
            Feel free to let us know if you have any more
            comments or suggestions.`,
            contact: {
                phone: "Contact : 096 561 9575",
                email: "Email: itacate.phnompenh@gmail.com"
            },
            comment:"Comments & Suggestions"

        }
    }
]
export const titleLogo = {
    title: "ITACATE",
    sub_title: "AUTHENTIC MEXICAN \n CUISINE",
    cuisine: "",
    bottomLogo: "Customer's Satisfaction Survey"

}