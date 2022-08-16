import { useContext, useState } from "react";

import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";
import { LocaleContext } from "../i18n/LocaleContext";

type ItemProps = {
  q: JSX.Element;
  a: JSX.Element;
};

function Item({ q, a }: ItemProps, idx: number) {
  const [open, setOpen] = useState(false);

  const question = (
    <dt
      key={1}
      className="font-bold cursor-pointer pb-3"
      onClick={(e) => setOpen(!open)}
    >
      {q}
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

export default function Info() {
  const localeContext = useContext(LocaleContext);

  const faqs = [
    {
      q: <FormattedMessage id="q1" />,
      a: (
        <dd key={2}>
          <FormattedMessage id="a1" />{" "}
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q2" />,
      a: (
        <dd key={2}>
          <FormattedMessage
            id="a2"
            values={{
              button: (chunks: string) => {
                return (
                  <Link to="/settings">
                    <button className="underline">{chunks}</button>
                  </Link>
                );
              },
            }}
          />
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q3" />,
      a: (
        <dd key={2}>
          <FormattedMessage
            id="a3"
            values={{
              a: (chunks: string) => {
                return (
                  <a
                    className="underline"
                    href="https://www.sporcle.com/blog/2013/01/what-is-a-country/"
                  >
                    {chunks}
                  </a>
                );
              },
            }}
          />
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q4" />,
      a: (
        <dd key={2}>
          <FormattedMessage id="a4" />
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q5" />,
      a: (
        <dd key={2}>
          <FormattedMessage id="a5" />
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q6" />,
      a: (
        <dd key={2}>
          <FormattedMessage id="a6" />
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q7" />,
      a: (
        <dd key={2}>
          <FormattedMessage
            id="a7"
            values={{
              GitHub: (
                <a
                  className="underline"
                  href="https://github.com/the-abe-train/globle"
                >
                  GitHub
                </a>
              ),
              Twitter: (
                <a
                  className="underline"
                  href="https://twitter.com/theAbeTrain"
                  aria-label="Twitter"
                >
                  Twitter
                </a>
              ),
            }}
          />
        </dd>
      ),
    },
    {
      q: <FormattedMessage id="q8" />,
      a: (
        <dd key={2}>
          <FormattedMessage id="a8" />
        </dd>
      ),
    },
  ];

  // Need to skip question 6 if not English or French because it doesn't apply.
  if (localeContext.locale !== "en-CA" && localeContext.locale !== "fr-FR") {
    faqs.splice(5, 1);
  }

  return (
    <div className="my-2 space-y-7 dark:text-gray-200">
      <h2
        className="text-center text-2xl my-5 font-extrabold"
        style={{ fontFamily: "'Montserrat'" }}
      >
        <FormattedMessage id="FAQTitle" />
      </h2>
      <dl className="space-y-8 pb-8">
        {faqs.map((faq, idx) => Item(faq, idx))}
      </dl>
    </div>
  );
}
