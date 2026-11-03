import { fetchPage, menuFor } from "@/lib/pages";
import PageContent from "@/ui/PageContent";

// The page-builder page called "home", when published, is the front page.
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const home = await fetchPage("home");
  return home ? { title: home.title } : { title: "Itacate" };
}

export default async function Page() {
  const home = await fetchPage("home");
  return home ? <PageContent page={home} items={await menuFor(home)} /> : <></>;
}
