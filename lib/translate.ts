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
            submit_failed:string,
        }
        comment:string,
        choose_following:string,
        submit:string,
        submitting:string,
        yes:string,
        no:string,
        comment_placeholder:string,
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
                phone_format:"លេខទូរស័ព្ទមិនត្រឹមត្រូវ",
                choose:"សូមជ្រើសរើសចម្លើយខាងក្រោម",
                another_choice:"សូមជ្រើសរើសចម្លើយ",
                submit_failed:"មិនអាចបញ្ជូនបានទេ សូមព្យាយាមម្តងទៀត",
            },
            submit:"បញ្ជូន",
            submitting:"កំពុងបញ្ជូន...",
            yes:"បាទ/ចាស",
            no:"ទេ",
            comment_placeholder:"សរសេរមតិ ឬយោបល់របស់អ្នក...",
            choose_following:"សូមជ្រើសរើសចម្លើយដែលល្អបំផុតសម្រាប់ចំណុចនីមួយៗខាងក្រោម។",
            restuarant: "តើនេះជាដំណើរទស្សនកិច្ចលើកដំបូងរបស់អ្នកមកភោជនីយដ្ឋានយើងខ្ញុំមែនទេ?",
            languageButton: "ខ្មែរ",
            name: "ឈ្មោះ",
            name_placeholder: "សីហា មង្គល",
            phone_placeholder: "000 000 000",
            phone: "លេខទូរសព្ទ",
            date_visit: "កាលបរិច្ឆេទនៃដំណើរទស្សនកិច្ច:",
            title_tell_us: "ប្រាប់យើងអំពីដំណើរទស្សនកិច្ចរបស់អ្នក។",
            feeback_message: "យើងខ្ញុំសូមកោតសរសើរចំពោះមតិកែលម្អរបស់អ្នក។\nយើងសង្ឃឹមថាមតិរបស់អ្នកនឹងជួយយើងឱ្យកែលម្អសេវាកម្ម!\nសូមអរគុណចំពោះការចំណាយពេលបំពេញការស្ទង់មតិនេះ។\nសូមប្រាប់យើងបន្ថែម ប្រសិនបើអ្នកមានមតិ ឬយោបល់ផ្សេងទៀត។",
            contact: {
                phone: "លេខទូរសព្ទ : 096 561 9575",
                email: "អុីម៉ែល: itacate.phnompenh@gmail.com"

            },

            comment:"មតិ និងយោបល់"
        }
    },
    {
        name: "en",
        menu: {
            submit:"Submit",
            submitting:"Sending...",
            yes:"Yes",
            no:"No",
            comment_placeholder:"Write your comments or suggestions...",
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
                submit_failed:"Could not send your survey. Please try again.",
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