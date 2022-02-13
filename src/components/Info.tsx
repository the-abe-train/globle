import { useState } from "react";

function Item({ q, a }: { q: string; a: any }, idx: number) {
  const [open, setOpen] = useState(false);
  const question = (
    <dt
      key={1}
      className="font-bold cursor-pointer pb-3"
      onClick={(e) => setOpen(!open)}
    >
      {`${idx + 1}. ${q}`}
    </dt>
  );
  if (open) {
    return (
      <div className="" key={idx}>
        {[question, a]}
      </div>
    );
  } else {
    return <div key={idx}>{question}</div>;
  }
}

type Props = {
  setScreen: React.Dispatch<React.SetStateAction<string>>;
};

export default function Info({ setScreen }: Props) {
  const faqs = [
    {
      q: "How is the distance between the answer and my guess calculated?",
      a: (
        <dd key={2}>
          Distance between countries is defined as the minimum distance between
          their borders.
        </dd>
      ),
    },
    {
      q: "How can I play the game if I am colour blind or visually impaired?",
      a: (
        <dd key={2}>
          A high-contrast Colour Blind mode can be activated in{" "}
          <button className="underline" onClick={(e) => setScreen("Settings")}>
            Settings
          </button>
          .
        </dd>
      ),
    },
    {
      q: "How does the game decide what is a valid country?",
      a: (
        <dd key={2}>
          {" "}
          Globle uses{" "}
          <a
            className="underline"
            href="https://www.sporcle.com/blog/2013/01/what-is-a-country/"
          >
            this framework
          </a>{" "}
          to determine what constitutes a valid guess.{" "}
        </dd>
      ),
    },
    {
      q: "Are autonomous but not sovereign countries in the game?",
      a: (
        <dd key={2}>
          Some territories will appear in a neutral colour when their sovereign
          country is guessed, e.g. Greenland for Denmark. The location of these
          territories does not impact the colour of the sovereign country. Most
          small territories do not appear in the game, e.g. Curaçao.
        </dd>
      ),
    },
    {
      q: "I found today's mystery country! When do I get to play again?",
      a: (
        <dd key={2}>
          The mystery country changes and your guesses reset at midnight in your
          time zone.
        </dd>
      ),
    },
    {
      q: "Are alternative spellings for countries acceptable?",
      a: (
        <dd key={2}>
          There are many countries with multiple acceptable names. Some
          alternate spellings and previous names are accepted, e.g. Burma for
          Myanmar. As well, acronyms are accaptable for some multi-word
          countries, e.g. UAE for United Arab Emerates.
        </dd>
      ),
    },
    {
      q: "A country is missing or a border is incorrect. What can I do about it?",
      a: (
        <dd key={2}>
          Geography can be a sensitive topic, and some countries' borders are
          disputed. If you believe a correction should be made, please politely
          raise an issue on{" "}
          <a
            className="underline"
            href="https://github.com/the-abe-train/globle"
          >
            GitHub
          </a>{" "}
          or DM me on{" "}
          <a
            className="underline"
            href="https://twitter.com/theAbeTrain"
            aria-label="Twitter"
          >
            Twitter
          </a>
          .
        </dd>
      ),
    },
  ];
  return (
    <div className="my-2 space-y-7">
      <h2
        className="text-center text-2xl my-5 font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        FAQ
      </h2>
      <dl className="space-y-8">{faqs.map((faq, idx) => Item(faq, idx))}</dl>
    </div>
    // <div className="my-2 space-y-7">
    //   <h2
    //     className="text-center text-2xl my-5 font-extrabold"
    //     style={{ fontFamily: "'Montserrat'" }}
    //   >
    //     Appendix
    //   </h2>
    //   <ul className="list-disc space-y-4 w-11/12 mx-auto my-2">
    //     <li>
    //       {" "}
    //       Distance between countries is defined as the minimum distance between
    //       borders of the guess country and the mystery country.
    //     </li>
    //     <li>
    //       {" "}
    //       Colour Blind mode is available in Settings for players that are colour
    //       blind or otherwise vision-impared.
    //     </li>
    //     <li>
    //       {" "}
    //       Globle uses{" "}
    //       <a
    //         className="underline"
    //         href="https://www.sporcle.com/blog/2013/01/what-is-a-country/"
    //       >
    //         this framework
    //       </a>{" "}
    //       to determine what constitutes a valid guess.
    //     </li>
    //     <li>
    //       {" "}
    //       Some territories will appear in a neutral colour when their sovereign
    //       country is guessed. The location of these territories does not impact
    //       the colour of the sovereign country. Most small territories do not
    //       appear in the game.
    //     </li>
    //     <li>
    //       {" "}
    //       The mystery country changes and your guesses reset at midnight in your
    //       time zone.
    //     </li>
    //     <li>
    //       {" "}
    //       Some alternate spellings and previous names are accepted, e.g. Burma
    //       for Myanmar.
    //     </li>
    //     <li>
    //       {" "}
    //       Geography can be a sensitive topic, and some countries' borders are
    //       disputed. If you believe a correction should be made, please politely
    //       raise an issue on{" "}
    //       <a
    //         className="underline"
    //         href="https://github.com/the-abe-train/globle"
    //       >
    //         GitHub
    //       </a>{" "}
    //       or DM me on{" "}
    //       <a
    //         className="underline"
    //         href="https://twitter.com/theAbeTrain"
    //         aria-label="Twitter"
    //       >
    //         Twitter
    //       </a>
    //       .
    //     </li>
    //   </ul>
    // </div>
  );
}
