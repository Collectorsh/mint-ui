import Image from "next/image";
import Link from "next/link";
import NoSSR from "react-no-ssr";
import Mint from "/components/mint";

export default function Home() {
  return (
    <main className="max-w-6xl mx-auto py-2 px-2 xl:px-0">
      <section>
        <div className="float-left">
          <Image src="/collector.png" alt="collector" width={200} height={40} />
          <p className="mt-1 text-lg border-b-2 pb-1 border-black w-fit">
            Connecting Collectors, Artists &amp; Curators
          </p>
        </div>
        <div className="float-right">
          <Link href="" alt="GitHub" target="_blank">
            <Image
              src="/github.png"
              alt="GitHub"
              width={30}
              height={30}
              className="inline mr-1"
            />
          </Link>
        </div>
      </section>
      <section className="clear-both">
        <p className="mt-40">
          This open source minting tool is built with support from the{" "}
          <Link
            href="https://twitter.com/SuperteamDE"
            alt="Superteam Germany"
            target="_blank"
            className="underline"
          >
            Superteam Germany
          </Link>
        </p>
      </section>
      <section className="mt-20 pt-10 border-t border-neutral-200">
        <NoSSR>
          <Mint />
        </NoSSR>
      </section>
    </main>
  );
}
