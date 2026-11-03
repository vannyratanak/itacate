import { Fragment } from "react";
import "@/styles/page-base.css";
import { MenuItem } from "@/lib/menu";
import { SitePage, MENU_BLOCK, withBackendAssets } from "@/lib/pages";
import MenuList from "@/ui/MenuList";

export default function PageContent({ page, items }: { page: SitePage; items: MenuItem[] }) {
    const html = withBackendAssets(page.html);
    const parts = html.split(MENU_BLOCK);
    const menuCount = parts.length - 1;
    return (
        // The base look (.itacate-page) wraps only the builder's own HTML, so it can't leak into the real menu.
        <div style={{ minHeight: "100vh" }}>
            <style dangerouslySetInnerHTML={{ __html: withBackendAssets(page.css) }} />
            {parts.map((chunk, i) => (
                <Fragment key={i}>
                    {chunk.trim() !== "" && <div className="itacate-page" dangerouslySetInnerHTML={{ __html: chunk }} />}
                    {i < menuCount && (
                        <div className="container mx-auto max-w-screen-sm px-3 pb-16 lg:max-w-screen-lg">
                            <MenuList items={items} />
                        </div>
                    )}
                </Fragment>
            ))}
        </div>
    );
}
