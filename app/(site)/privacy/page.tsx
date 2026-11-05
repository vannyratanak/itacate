import Legal, { LegalSection } from "@/ui/pages/Legal";

export const metadata = { title: "Privacy policy" };

// NOTE: sample text. Replace with your own privacy policy before launch.
const sections: LegalSection[] = [
    { title: { en: "Who we are", kh: "យើងជានរណា" }, body: [
        { en: "Itacate (“we”, “us”) is a restaurant in Phnom Penh, Cambodia. This policy explains what information we collect through this website and how we use it.", kh: "Itacate (“យើង”) គឺជាភោជនីយដ្ឋានមួយនៅភ្នំពេញ ប្រទេសកម្ពុជា។ គោលការណ៍នេះពន្យល់អំពីព័ត៌មានដែលយើងប្រមូលតាមរយៈគេហទំព័រនេះ និងរបៀបដែលយើងប្រើប្រាស់វា។" }] },
    { title: { en: "Information we collect", kh: "ព័ត៌មានដែលយើងប្រមូល" }, body: [
        { en: "We only collect what you choose to send us:", kh: "យើងប្រមូលតែអ្វីដែលអ្នកជ្រើសរើសផ្ញើមកយើងប៉ុណ្ណោះ៖" }], list: [
        { en: "Reservation, contact, catering, gift card and job forms: your name, phone number, email address and message.", kh: "ទម្រង់កក់តុ ទំនាក់ទំនង ម្ហូបកម្មង់ កាតអំណោយ និងការងារ៖ ឈ្មោះ លេខទូរស័ព្ទ អ៊ីមែល និងសារ​របស់អ្នក។" },
        { en: "Customer survey: your name, phone number, visit date and your answers.", kh: "ការស្ទង់មតិអតិថិជន៖ ឈ្មោះ លេខទូរស័ព្ទ កាលបរិច្ឆេទមកទស្សនា និងចម្លើយរបស់អ្នក។" },
        { en: "We do not collect payment card details on this website.", kh: "យើងមិនប្រមូលព័ត៌មានកាតទូទាត់នៅលើគេហទំព័រនេះទេ។" }] },
    { title: { en: "How we use it", kh: "របៀបដែលយើងប្រើប្រាស់ព័ត៌មាន" }, body: [
        { en: "We use your details to confirm reservations, reply to your messages, process requests and improve our food and service. Survey answers are reviewed by our team; a comment is only shown publicly on our Reviews page after it has been approved.", kh: "យើងប្រើព័ត៌មានរបស់អ្នកដើម្បីបញ្ជាក់ការកក់តុ ឆ្លើយតបសាររបស់អ្នក ដំណើរការសំណើ និងកែលម្អម្ហូប និងសេវាកម្មរបស់យើង។ ចម្លើយស្ទង់មតិត្រូវបានពិនិត្យដោយក្រុមការងារយើង ហើយមតិយោបល់នឹងបង្ហាញជាសាធារណៈនៅទំព័រមតិអតិថិជន បន្ទាប់ពីត្រូវបានអនុម័តប៉ុណ្ណោះ។" }] },
    { title: { en: "Sharing", kh: "ការចែករំលែក" }, body: [
        { en: "We do not sell your information. It is only seen by our staff, and shared with others only when the law requires it.", kh: "យើងមិនលក់ព័ត៌មានរបស់អ្នកទេ។ មានតែបុគ្គលិករបស់យើងប៉ុណ្ណោះដែលអាចមើលឃើញ ហើយនឹងចែករំលែកជាមួយអ្នកផ្សេងលុះត្រាតែច្បាប់តម្រូវ។" }] },
    { title: { en: "Cookies and local storage", kh: "ខូគី និងការផ្ទុកក្នុងកម្មវិធីរុករក" }, body: [
        { en: "We store your language choice in your browser so the site remembers it during your visit. We do not use advertising trackers.", kh: "យើងរក្សាទុកភាសាដែលអ្នកជ្រើសរើសនៅក្នុងកម្មវិធីរុករករបស់អ្នក ដើម្បីឱ្យគេហទំព័រចងចាំវាក្នុងអំឡុងពេលមកទស្សនា។ យើងមិនប្រើឧបករណ៍តាមដានសម្រាប់ផ្សព្វផ្សាយទេ។" }] },
    { title: { en: "How long we keep it", kh: "រយៈពេលដែលយើងរក្សាទុក" }, body: [
        { en: "We keep your information only as long as we need it for the purposes above, then delete it.", kh: "យើងរក្សាព័ត៌មានរបស់អ្នកតែរយៈពេលដែលចាំបាច់សម្រាប់គោលបំណងខាងលើប៉ុណ្ណោះ បន្ទាប់មកលុបវាចោល។" }] },
    { title: { en: "Your choices", kh: "ជម្រើសរបស់អ្នក" }, body: [
        { en: "You can ask to see, correct or delete the information we hold about you at any time. Contact us using the details on our Contact page.", kh: "អ្នកអាចស្នើសុំមើល កែតម្រូវ ឬលុបព័ត៌មានដែលយើងរក្សាទុកអំពីអ្នកគ្រប់ពេលវេលា។ សូមទាក់ទងយើងតាមព័ត៌មាននៅទំព័រទំនាក់ទំនង។" }] },
    { title: { en: "Changes to this policy", kh: "ការផ្លាស់ប្តូរគោលការណ៍នេះ" }, body: [
        { en: "If we change this policy we will post the new version on this page and update the date above.", kh: "ប្រសិនបើយើងផ្លាស់ប្តូរគោលការណ៍នេះ យើងនឹងបង្ហោះកំណែថ្មីនៅលើទំព័រនេះ ហើយធ្វើបច្ចុប្បន្នភាពកាលបរិច្ឆេទខាងលើ។" }] },
];

export default function PrivacyPage() {
    return <Legal title={{ en: "Privacy policy", kh: "គោលការណ៍ឯកជនភាព" }}
        intro={{ en: "How we look after the information you share with us.", kh: "របៀបដែលយើងថែរក្សាព័ត៌មានដែលអ្នកចែករំលែកជាមួយយើង។" }}
        updated={{ en: "Last updated: January 2026", kh: "ធ្វើបច្ចុប្បន្នភាពចុងក្រោយ៖ មករា ២០២៦" }} sections={sections} />;
}
