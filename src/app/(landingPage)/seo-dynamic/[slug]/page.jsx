import SeoPage, {
  generateMetadata as generateSeoMetadata,
  generateStaticParams as generateSeoStaticParams,
} from "../../[slug]/page";

export const dynamicParams = false;
export const revalidate = 86400;

export function generateStaticParams() {
  return generateSeoStaticParams();
}

export async function generateMetadata({ params }) {
  return generateSeoMetadata({ params });
}

export default SeoPage;
