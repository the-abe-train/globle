export default function Info() {
  return (
    <div className="my-2 space-y-7">
      <h2
        className="text-center text-2xl my-5 font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        Appendix
      </h2>
      <ul className="list-disc space-y-4 w-11/12 mx-auto my-2">
        <li>
          {" "}
          Distance between countries is defined as the minimum distance between
          borders of the guess country and the mystery country.
        </li>
        <li>
          {" "}
          Colour Blind mode is available in Settings for players that are colour
          blind or otherwise vision-impared.
        </li>
        <li>
          {" "}
          Globle uses{" "}
          <a
            className="underline"
            href="https://www.sporcle.com/blog/2013/01/what-is-a-country/"
          >
            this framework
          </a>{" "}
          to determine what constitutes a valid guess.
        </li>
        <li>
          {" "}
          Some territories will appear in a neutral colour when their sovereign
          country is guessed. The location of these territories does not impact
          the colour of the sovereign country. Most small territories do not
          appear in the game.
        </li>
        <li>
          {" "}
          The mystery country changes and your guesses reset at midnight in your
          time zone.
        </li>
        <li>
          {" "}
          Some alternate spellings and previous names are accepted, e.g. Burma
          for Myanmar.
        </li>
        <li>
          {" "}
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
        </li>
      </ul>
    </div>
  );
}
