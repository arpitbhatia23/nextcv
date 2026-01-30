import Image from "next/image";

export function SaasHuntBadge() {
  const src = "https://saashunt.best/images/badges/top1-light.svg";
  //   ("https://saashunt.com/badges/top1-dark.svg");

  return (
    <a
      href="https://saashunt.com"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="SaaSHunt Top 1 Daily Winner"
      className="inline-flex items-center"
    >
      <Image
        src={src}
        alt="SaaSHunt Top 1 Daily Winner"
        width={180}
        height={54}
      />
    </a>
  );
}

{
  /* <a
  href="https://saashunt.best/projects/next-cv"
  target="_blank"
  title="SaasHunt Top 1 Daily Winner"
>
  <img
    src="https://saashunt.best/images/badges/top1-light.svg"
    alt="SaasHunt Top 1 Daily Winner"
    style="width: 195px; height: auto;"
  />
</a>; */
}
