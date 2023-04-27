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
        }
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

            }
        }
    },
    {
        name: "en",
        menu: {
            restuarant: "Was this your first visit to our restaurant?",
            languageButton: "English",
            name: "Name",

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
            }

        }
    }
]
export const titleLogo = {
    title: "ITACATE",
    sub_title: "AUTHENTIC MEXICAN \n CUISINE",
    cuisine: "",
    bottomLogo: "Customer's Satisfaction Survey"

}