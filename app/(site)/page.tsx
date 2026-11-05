import { fetchPage, menuFor } from "@/lib/pages";
import { fetchMenuSafe } from "@/lib/menu";
import { fetchSettings } from "@/lib/settings";
import { fetchShop, logoSrc } from "@/lib/shop";
import PageContent from "@/ui/PageContent";
import HomeView from "@/ui/home/HomeView";

// A published page-builder page called "home" wins; otherwise the default home below.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const home = await fetchPage("home");
  if (home) return { title: home.title };
  const shop = await fetchShop();
  return { title: shop.name, description: shop.title };
}

export default async function Page() {
  const home = await fetchPage("home");
  if (home) return <PageContent page={home} items={await menuFor(home)} />;

  const [shop, settings, menu] = await Promise.all([fetchShop(), fetchSettings(), fetchMenuSafe()]);
  const picks = menu.filter(i => i.chefs_pick);
  return <HomeView name={shop.name} tagline={shop.title} logo={logoSrc(shop)} picks={(picks.length ? picks : menu).slice(0, 3)} settings={settings} />;
}
