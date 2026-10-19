import Link from "next/link";
import { ChevronRight } from "lucide-react";

/**
 * ProductBreadcrumbs
 *
 * Renders an accessible, SEO-aligned visual breadcrumb trail for product pages.
 */
export default function ProductBreadcrumbs({ items = [] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 flex items-center text-xs text-[#5B625C]">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li>
          <Link
            href="/"
            className="transition-colors hover:text-[#17201C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#465B9E]"
          >
            Home
          </Link>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              <ChevronRight className="h-3 w-3 text-[#A4A8A3]" aria-hidden="true" />
              {isLast || !item.href ? (
                <span className="font-medium text-[#17201C]" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="transition-colors hover:text-[#17201C] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#465B9E]"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

