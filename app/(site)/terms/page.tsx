import Legal, { LegalSection } from "@/ui/pages/Legal";

export const metadata = { title: "Terms of use" };

// NOTE: sample text. Replace with your own terms before launch.
const sections: LegalSection[] = [
    { title: { en: "Using this website", kh: "ការប្រើប្រាស់គេហទំព័រនេះ" }, body: [
        { en: "By using this website you agree to these terms. Please use it lawfully and do not try to disrupt it or access areas that are not meant for the public.", kh: "ដោយប្រើប្រាស់គេហទំព័រនេះ អ្នកយល់ព្រមតាមលក្ខខណ្ឌទាំងនេះ។ សូមប្រើវាតាមផ្លូវច្បាប់ ហើយកុំព្យាយាមរំខាន ឬចូលទៅកាន់ផ្នែកដែលមិនមែនសម្រាប់សាធារណៈ។" }] },
    { title: { en: "Reservations", kh: "ការកក់តុ" }, body: [
        { en: "A reservation request is confirmed only when we reply to you or the status shows as confirmed.", kh: "សំណើកក់តុត្រូវបានបញ្ជាក់ លុះត្រាតែយើងឆ្លើយតបទៅអ្នក ឬស្ថានភាពបង្ហាញថាបានបញ្ជាក់។" }], list: [
        { en: "We hold your table for 15 minutes after the booked time.", kh: "យើងរក្សាតុរបស់អ្នកអស់រយៈពេល ១៥ នាទី បន្ទាប់ពីម៉ោងដែលបានកក់។" },
        { en: "Please let us know at least 2 hours ahead if you need to cancel or change.", kh: "សូមជូនដំណឹងយើងយ៉ាងហោចណាស់ ២ ម៉ោងមុន ប្រសិនបើអ្នកត្រូវលុបចោល ឬផ្លាស់ប្តូរ។" },
        { en: "Large groups may be asked for a deposit or a set menu.", kh: "ក្រុមធំអាចត្រូវបានស្នើសុំប្រាក់កក់ ឬម៉ឺនុយកំណត់។" }] },
    { title: { en: "Offers and gift cards", kh: "ការផ្តល់ជូន និងកាតអំណោយ" }, body: [
        { en: "Offers are valid on the dates shown and cannot be combined unless stated. Gift cards are not redeemable for cash.", kh: "ការផ្តល់ជូនមានសុពលភាពតាមកាលបរិច្ឆេទដែលបានបង្ហាញ ហើយមិនអាចប្រើរួមគ្នាបានទេ លុះត្រាតែបានបញ្ជាក់។ កាតអំណោយមិនអាចប្តូរជាសាច់ប្រាក់បានទេ។" }] },
    { title: { en: "Surveys and reviews", kh: "ការស្ទង់មតិ និងមតិអតិថិជន" }, body: [
        { en: "If you leave a comment in our survey, we may show it on our Reviews page after approval, with your first name only. We may decide not to show a comment.", kh: "ប្រសិនបើអ្នកបន្សល់មតិយោបល់ក្នុងការស្ទង់មតិរបស់យើង យើងអាចបង្ហាញវានៅទំព័រមតិអតិថិជន បន្ទាប់ពីអនុម័ត ដោយបង្ហាញតែនាមខ្លួនរបស់អ្នក។ យើងអាចសម្រេចចិត្តមិនបង្ហាញមតិយោបល់ណាមួយក៏បាន។" }] },
    { title: { en: "Allergies and dietary needs", kh: "ការអាឡែកស៊ី និងតម្រូវការអាហារូបត្ថម្ភ" }, body: [
        { en: "Please tell us about any allergy before you order. Our kitchen handles nuts, gluten, dairy, shellfish and other allergens, so we cannot guarantee that any dish is completely allergen-free.", kh: "សូមប្រាប់យើងអំពីការអាឡែកស៊ីណាមួយមុនពេលកម្មង់។ ផ្ទះបាយរបស់យើងប្រើគ្រាប់ធញ្ញជាតិ គ្លូតែន ទឹកដោះគោ គ្រុនសមុទ្រ និងសារធាតុអាឡែកហ្សែនផ្សេងទៀត ដូច្នេះយើងមិនអាចធានាថាម្ហូបណាមួយគ្មានសារធាតុអាឡែកហ្សែនទាំងស្រុងនោះទេ។" }] },
    { title: { en: "Content", kh: "មាតិកា" }, body: [
        { en: "The text, photos and logo on this website belong to Itacate or are used with permission. Please do not copy them for commercial use without asking us first.", kh: "អត្ថបទ រូបថត និងរូបសញ្ញានៅលើគេហទំព័រនេះជាកម្មសិទ្ធិរបស់ Itacate ឬត្រូវបានប្រើដោយមានការអនុញ្ញាត។ សូមកុំចម្លងសម្រាប់ប្រើប្រាស់ពាណិជ្ជកម្មដោយមិនសុំយើងជាមុន។" }] },
    { title: { en: "Limits of liability", kh: "ដែនកំណត់នៃទំនួលខុសត្រូវ" }, body: [
        { en: "We try to keep this website accurate and available, but we do not promise it will always be error-free. Menu items, prices and opening hours may change without notice.", kh: "យើងព្យាយាមរក្សាគេហទំព័រនេះឱ្យត្រឹមត្រូវ និងអាចប្រើបាន ប៉ុន្តែយើងមិនសន្យាថាវានឹងគ្មានកំហុសជានិច្ចទេ។ មុខម្ហូប តម្លៃ និងម៉ោងបើកអាចផ្លាស់ប្តូរដោយមិនមានការជូនដំណឹងជាមុន។" }] },
    { title: { en: "Governing law", kh: "ច្បាប់អនុវត្ត" }, body: [
        { en: "These terms are governed by the laws of the Kingdom of Cambodia.", kh: "លក្ខខណ្ឌទាំងនេះស្ថិតនៅក្រោមច្បាប់នៃព្រះរាជាណាចក្រកម្ពុជា។" }] },
    { title: { en: "Contact", kh: "ទំនាក់ទំនង" }, body: [
        { en: "Questions about these terms? Reach us through the Contact page.", kh: "មានសំណួរអំពីលក្ខខណ្ឌទាំងនេះ? សូមទាក់ទងយើងតាមទំព័រទំនាក់ទំនង។" }] },
];

export default function TermsPage() {
    return <Legal title={{ en: "Terms of use", kh: "លក្ខខណ្ឌប្រើប្រាស់" }}
        intro={{ en: "The simple ground rules for using our website and booking with us.", kh: "ច្បាប់មូលដ្ឋានសាមញ្ញសម្រាប់ការប្រើប្រាស់គេហទំព័រ និងការកក់ជាមួយយើង។" }}
        updated={{ en: "Last updated: January 2026", kh: "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ មករា ២០២៦" }} sections={sections} />;
}
