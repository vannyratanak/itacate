import { ButtonLink, Card, Container, PageHero, Section } from "@/ui/site/kit";
import { L } from "@/ui/site/L";
import Avatar from "@/ui/pages/Avatar";

export const metadata = { title: "About us" };

const values = [
    { icon: "🌽", en: "Cooked by hand", kh: "ចម្អិនដោយដៃ", ben: "Tortillas pressed every morning, salsas roasted in small batches. We do not take shortcuts.", bkh: "តូទីយ៉ាសង្កត់រាល់ព្រឹក សាល់ស្សាអាំងជាបរិមាណតិចៗ។ យើងមិនកាត់បន្ថយជំហានណាមួយទេ។" },
    { icon: "🍽️", en: "Shared at the table", kh: "ចែករំលែកនៅលើតុ", ben: "Plates are made for passing around. Good food tastes better with friends and family.", bkh: "ចានម្ហូបត្រូវបានធ្វើសម្រាប់បញ្ជូនគ្នា។ ម្ហូបឆ្ងាញ់ជាងមុន ពេលញ៉ាំជាមួយមិត្តភក្តិ និងគ្រួសារ។" },
    { icon: "🌿", en: "Rooted in Phnom Penh", kh: "ចាក់ឫសនៅភ្នំពេញ", ben: "We buy from nearby farms and fishers and hire from our own neighbourhood.", bkh: "យើងទិញពីកសិដ្ឋាន និងអ្នកនេសាទក្បែរៗ ហើយជួលបុគ្គលិកពីសង្កាត់របស់យើងផ្ទាល់។" },
];

const timeline = [
    { year: "2018", en: "Six tables and one stove: Itacate opens its doors.", kh: "តុប្រាំមួយ និងចង្ក្រានមួយ៖ Itacate បើកទ្វារជាលើកដំបូង។" },
    { year: "2020", en: "We start grinding our own masa every morning.", kh: "យើងចាប់ផ្តើមកិនម៉ាសាផ្ទាល់ខ្លួនរាល់ព្រឹក។" },
    { year: "2022", en: "A bigger kitchen and a bar for our margaritas.", kh: "ផ្ទះបាយធំជាងមុន និងបារសម្រាប់ម៉ាហ្គារីតារបស់យើង។" },
    { year: "2024", en: "Named a local favourite by our guests.", kh: "ត្រូវបានភ្ញៀវរបស់យើងជ្រើសរើសជាកន្លែងដែលចូលចិត្តបំផុតក្នុងតំបន់។" },
    { year: "2026", en: "The new terrace opens, with live music on Fridays.", kh: "រានហាលថ្មីបើកចំហ ជាមួយតន្ត្រីផ្ទាល់រៀងរាល់ថ្ងៃសុក្រ។" },
];

const team = [
    { name: "Maria Lopez", en: "Head chef", kh: "ចុងភៅធំ", bg: "#F0B45A", skin: "#E0A074", hair: "#2b1a05", style: 1 as const },
    { name: "Sokha Chan", en: "Restaurant manager", kh: "អ្នកគ្រប់គ្រងភោជនីយដ្ឋាន", bg: "#9CC7B6", skin: "#D9A47A", hair: "#1b1208", style: 0 as const },
    { name: "Daniel Reyes", en: "Bar lead", kh: "ប្រធានបារ", bg: "#E58C6B", skin: "#C98B62", hair: "#3b2410", style: 2 as const },
    { name: "Dara Kim", en: "Pastry chef", kh: "ចុងភៅធ្វើនំ", bg: "#F3D27A", skin: "#E3AE86", hair: "#1b1208", style: 3 as const },
];

export default function AboutPage() {
    return (
        <>
            <PageHero title={<L en="Our story" kh="រឿងរ៉ាវរបស់យើង" />}
                subtitle={<L en="A small family kitchen with a big love for honest Mexican food." kh="ផ្ទះបាយគ្រួសារតូចមួយ ដែលស្រលាញ់ម្ហូបម៉ិកស៊ិកពិតប្រាកដយ៉ាងខ្លាំង។" />} />

            <Container className="grid items-center gap-10 py-14 md:grid-cols-2 md:py-20">
                <div className="space-y-4 text-lg leading-relaxed text-[#4A3412]/90">
                    <p><L en="Itacate started with a simple idea: share the food we grew up eating with the people we love. What began as one stove and six tables has become a warm, noisy, delicious place where friends gather every night."
                        kh="Itacate ចាប់ផ្តើមពីគំនិតសាមញ្ញមួយ៖ ចែករំលែកម្ហូបដែលយើងធ្លាប់ញ៉ាំកាលពីតូចជាមួយមនុស្សដែលយើងស្រលាញ់។ អ្វីដែលចាប់ផ្តើមពីចង្ក្រានមួយ និងតុប្រាំមួយ បានក្លាយជាកន្លែងកក់ក្តៅ រស់រវើក និងឆ្ងាញ់ ដែលមិត្តភក្តិជួបជុំគ្នារាល់ល្ងាច។" /></p>
                    <p><L en="Our menu is built around the recipes of our families, cooked with fresh local ingredients and plenty of patience. Come as you are, order too much and stay for dessert."
                        kh="ម៉ឺនុយរបស់យើងកើតចេញពីរូបមន្តរបស់គ្រួសារយើង ចម្អិនជាមួយគ្រឿងផ្សំស្រស់ក្នុងស្រុក និងការអត់ធ្មត់ជាច្រើន។ សូមមកតាមដែលអ្នកមាន កម្មង់ឱ្យច្រើន ហើយនៅញ៉ាំបង្អែមផង។" /></p>
                </div>
                <div aria-hidden="true" className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-br from-[#F7D79A] to-[#E5902C] shadow-[0_18px_40px_-16px_rgba(150,90,20,.5)]">
                    <svg viewBox="0 0 400 300" className="h-full w-full">
                        <circle cx="300" cy="80" r="46" fill="#FFF6D6" opacity=".75" />
                        {[0, 1, 2, 3, 4].map(i => <path key={i} d="M200 250 C 150 190 170 120 200 60 C 230 120 250 190 200 250 Z" fill="#2f7d6d" opacity={0.5 + i * 0.1} transform={`rotate(${(i - 2) * 22} 200 250)`} />)}
                        <rect x="0" y="250" width="400" height="50" fill="#4A3412" opacity=".85" />
                    </svg>
                </div>
            </Container>

            <Section title={<L en="What we believe" kh="អ្វីដែលយើងជឿជាក់" />} tone="soft">
                <div className="grid gap-6 md:grid-cols-3">
                    {values.map(v => (
                        <Card key={v.en} className="text-center">
                            <div className="mb-3 text-4xl" aria-hidden="true">{v.icon}</div>
                            <h3 className="mb-2 text-xl font-bold text-[#4A3412]"><L en={v.en} kh={v.kh} /></h3>
                            <p className="text-[#6b4a1f]"><L en={v.ben} kh={v.bkh} /></p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section title={<L en="Our journey" kh="ដំណើររបស់យើង" />}>
                <ol className="relative mx-auto max-w-2xl border-l-2 border-[#E5902C]/40 pl-8">
                    {timeline.map(t => (
                        <li key={t.year} className="relative mb-8 last:mb-0">
                            <span className="absolute -left-[41px] top-1 h-4 w-4 rounded-full border-4 border-[#F3EABF] bg-[#E5902C]" aria-hidden="true" />
                            <div className="text-sm font-bold uppercase tracking-widest text-[#E5902C]">{t.year}</div>
                            <p className="mt-1 text-lg text-[#4A3412]"><L en={t.en} kh={t.kh} /></p>
                        </li>
                    ))}
                </ol>
            </Section>

            <Section title={<L en="Meet the team" kh="ជួបជាមួយក្រុមការងារ" />} subtitle={<L en="The people who cook, pour and look after you." kh="អ្នកដែលចម្អិន ចាក់ភេសជ្ជៈ និងថែរក្សាអ្នក។" />} tone="soft">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                    {team.map(m => (
                        <div key={m.name} className="flex flex-col items-center text-center">
                            <Avatar bg={m.bg} skin={m.skin} hair={m.hair} style={m.style} label={m.name} />
                            <div className="mt-3 font-bold text-[#4A3412]">{m.name}</div>
                            <div className="text-sm text-[#8A4F0E]"><L en={m.en} kh={m.kh} /></div>
                        </div>
                    ))}
                </div>
            </Section>

            <Section>
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-[#4A3412] md:text-3xl"><L en="Come and eat with us" kh="សូមមកញ៉ាំជាមួយយើង" /></h2>
                    <p className="mx-auto mt-2 max-w-xl text-[#8A4F0E]"><L en="Book a table or take a look at what is cooking." kh="កក់តុ ឬមើលម្ហូបដែលកំពុងចម្អិន។" /></p>
                    <div className="mt-6 flex flex-wrap justify-center gap-3">
                        <ButtonLink href="/reservations"><L en="Reserve a table" kh="កក់តុ" /></ButtonLink>
                        <ButtonLink href="/menu" variant="outline"><L en="See the menu" kh="មើលម៉ឺនុយ" /></ButtonLink>
                    </div>
                </div>
            </Section>
        </>
    );
}
