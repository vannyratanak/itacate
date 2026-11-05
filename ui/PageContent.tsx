import parse, { Element, HTMLReactParserOptions } from "html-react-parser";
import "@/styles/page-base.css";
import { MenuItem } from "@/lib/menu";
import { SitePage, withBackendAssets } from "@/lib/pages";
import ChooseLanguage from "@/ui/ChooseLanguage";
import MenuList from "@/ui/MenuList";

export default function PageContent({ page, items }: { page: SitePage; items: MenuItem[] }) {
    // The saved HTML is parsed into React elements (no dangerouslySetInnerHTML), and the page builder's
    // live-block placeholders are replaced in place, wherever they sit in the layout.
    const options: HTMLReactParserOptions = {
        replace(node) {
            if (!(node instanceof Element)) return;
            const kind = node.attribs?.["data-itacate"];
            if (kind === "menu") {
                return (
                    <div data-live className="container mx-auto max-w-screen-sm px-3 pb-16 lg:max-w-screen-lg">
                        <MenuList items={items} />
                    </div>
                );
            }
            if (kind === "language") {
                return (
                    <div data-live className="flex w-full flex-col items-center gap-4 text-center">
                        <ChooseLanguage />
                    </div>
                );
            }
        },
    };
    return (
        <div style={{ minHeight: "100vh" }}>
            <style dangerouslySetInnerHTML={{ __html: withBackendAssets(page.css) }} />
            <div className="itacate-page">{parse(withBackendAssets(page.html), options)}</div>
        </div>
    );
}
