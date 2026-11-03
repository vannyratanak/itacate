"use client";
import { useTranslate } from "@/hooks/useTranslate";
import { localName } from "@/lib/survey";
import { MenuItem } from "@/lib/menu";
import { assetUrl } from "@/lib/shop";

const slug = (c: string) => "cat-" + c.toLowerCase().replace(/[^a-z0-9]+/g, "-");

export default function MenuList({ items }: { items: MenuItem[] }) {
    const lang = useTranslate().name;
    // Categories keep the server's order (sorted in the backend dashboard).
    const categories = Array.from(new Set(items.map(i => i.category)));
    const khName = new Map(items.map(i => [i.category, i.category_kh] as const));
    const catLabel = (c: string) => (lang === "kh" && khName.get(c)) || c;

    if (items.length === 0) {
        return <p className="text-center text-[#E5902C]/80 py-20 text-lg">{lang === "kh" ? "ម៉ឺនុយនឹងមកដល់ឆាប់ៗនេះ" : "Our menu is coming soon."}</p>;
    }
    return (
        <>
            {/* Category bar: sticks under the top of the screen, scrolls sideways on phones */}
            <nav aria-label="Menu categories" className="sticky top-0 z-20 -mx-3 mb-8 bg-[#F3EABF]/90 px-3 py-3 backdrop-blur border-b border-[#E5902C]/20">
                <ul className="flex gap-2 overflow-x-auto md:justify-center [scrollbar-width:none]">
                    {categories.map(c => (
                        <li key={c} className="shrink-0">
                            <a href={`#${slug(c)}`} className="block rounded-full border border-[#E5902C] px-4 py-1.5 text-sm font-semibold text-[#E5902C] transition hover:bg-[#E5902C] hover:text-[#F3EABF]">{catLabel(c)}</a>
                        </li>
                    ))}
                </ul>
            </nav>

            {categories.map(category => (
                <section key={category} id={slug(category)} className="mb-12 scroll-mt-20">
                    <h2 className="mb-5 flex items-center gap-4 text-2xl font-bold text-[#E5902C] md:text-3xl">
                        {catLabel(category)}
                        <span aria-hidden="true" className="h-px flex-1 bg-[#E5902C]/30" />
                    </h2>
                    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {items.filter(i => i.category === category).map(item => {
                            const img = assetUrl(item.image_url);
                            const name = localName({ name_en: item.name_en, name_kh: item.name_kh ?? undefined }, lang);
                            const desc = lang === "kh" ? item.description_kh || item.description_en : item.description_en || item.description_kh;
                            return (
                                <li key={item.id} className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5902C]/25 bg-white/55 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                                    <div className="relative aspect-[4/3] overflow-hidden bg-[#E5902C]/15">
                                        {img ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={img} alt={name} loading="lazy" className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                                        ) : null}
                                        <span className="absolute bottom-3 right-3 rounded-full bg-[#E5902C] px-3 py-1 text-sm font-bold text-[#F3EABF] shadow">
                                            ${Number(item.price).toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="flex flex-1 flex-col gap-1 p-4">
                                        <h3 className="text-lg font-bold leading-snug text-gray-900">{name}</h3>
                                        {desc ? <p className="line-clamp-3 text-sm text-gray-600">{desc}</p> : null}
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </section>
            ))}
        </>
    );
}
