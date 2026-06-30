"use client";

import Image from "next/image";
import Link from "next/link";

const reviews = [
  {
    name: "Ali Bey",
    username: "@alibey_10",
    content:
      "found this really smooth, beautifully animated chatbot UI and it’s free on chamaac .com",
    image: "https://unavatar.io/x/alibey_10",
    tweetUrl: "https://x.com/alibey_10/status/2012187882371592380",
  },
  {
    name: "Wael Mustafa",
    username: "@WaelmMotion",
    content: "Congrats on launching, it looks amazing 👏",
    image: "https://unavatar.io/x/WaelmMotion",
    tweetUrl: "https://x.com/WaelmMotion/status/2017919937147269474",
  },
  {
    name: "Terry Carson",
    username: "@mrterrycarson",
    content:
      "These look awesome! Love seeing Chamaac UI get even better. Can't wait to try them out in my next project.",
    image: "https://unavatar.io/x/mrterrycarson",
    tweetUrl: "https://x.com/mrterrycarson/status/2017993149826678853",
  },
  {
    name: "OrcDev",
    username: "@orcdev",
    content: "you're welcome man! cool project!",
    image: "https://unavatar.io/x/orcdev",
    tweetUrl: "https://x.com/orcdev/status/2011527215708807274",
  },
  {
    name: "Akhil",
    username: "@akhilr0",
    content: "dope 🔥",
    image: "https://unavatar.io/x/akhilr0",
    tweetUrl: "https://x.com/akhilr0/status/2007471479685042576",
  },
  {
    name: "Alex Y",
    username: "@bytebiss39281",
    content:
      "the bloom effect on that grid is clean. shipping visual updates like this builds the taste over time.",
    image: "https://unavatar.io/x/bytebiss39281",
    tweetUrl: "https://x.com/bytebiss39281/status/2026852142544466052",
  },
  {
    name: "Irteza Bangash",
    username: "@ibangash_",
    content: "looks good. keep shipping bro!",
    image: "https://unavatar.io/x/ibangash_",
    tweetUrl: "https://x.com/ibangash_/status/2022158177454940172",
  },
  {
    name: "Yusuke",
    username: "@yusukelp",
    content:
      "Whoa,,That looks so smooth. I'm looking forward to see the whole product!",
    image: "https://unavatar.io/x/yusukelp",
    tweetUrl: "https://x.com/yusukelp/status/1995070018988699938",
  },
  {
    name: "Nitesh Bakhla",
    username: "@Nitesh025B",
    content: "great 🔥",
    image: "https://unavatar.io/x/Nitesh025B",
    tweetUrl: "https://x.com/Nitesh025B/status/2010724105411273039",
  },
];

const VerifiedBadge = () => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className="w-4 h-4 text-[#1d9bf0] fill-current ml-1 shrink-0"
  >
    <g>
      <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.01s-2.62-1.27-4.01-.81c-.67-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.98-.2-4.02.81s-1.27 2.62-.81 4.01c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.97.81 4.01s2.62 1.27 4.01.81c.67 1.31 1.91 2.19 3.34 2.19s2.67-.88 3.33-2.19c1.4.46 2.98.2 4.02-.81s1.27-2.62.81-4.01c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.5-3.5 1.4-1.4 2.1 2.1 4.6-4.6 1.4 1.4-6 6z"></path>
    </g>
  </svg>
);

export const Reviews = () => {
  return (
    <section className="w-full px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto">
      <div className="flex flex-col items-center gap-12 text-center mb-4 md:mb-12">
        <div className="flex flex-col gap-2 md:gap-4 items-center">
          <h2 className="section-heading">What People Are Saying</h2>
          <p className="description-primary text-sm md:text-lg max-w-[600px]">
            We make your interfaces reflect the quality of your work with
            premium shaders & components.
          </p>
        </div>
      </div>

      <div className="columns-1 md:columns-2 lg:columns-3 gap-2 md:gap-4 space-y-2 md:space-y-4">
        {reviews.map((review, index) => (
          <Link
            key={index}
            href={review.tweetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block break-inside-avoid border border-border p-4 rounded-xl transition-all duration-300 group cursor-pointer "
          >
            <div className="flex items-center justify-between mb-4 ]">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden ">
                  <Image
                    src={review.image}
                    alt={review.name}
                    className="w-full h-full object-cover"
                    fill
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${review.name}`;
                    }}
                  />
                </div>
                <div className="flex flex-col text-left">
                  <div className="flex flex-row items-center">
                    <span className="description-primary text-black dark:text-white">
                      {review.name}
                    </span>
                    <VerifiedBadge />
                  </div>
                  <span className="description-secondary">
                    {review.username}
                  </span>
                </div>
              </div>
            </div>
            <p className="description-primary text-black dark:text-white text-left leading-[1.5]">
              {review.content}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};
