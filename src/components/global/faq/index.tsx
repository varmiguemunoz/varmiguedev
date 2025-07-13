import React, { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "What is an AI agent?",
    answer:
      "It's an automated assistant that can reply to messages, assist customers, perform repetitive tasks, and optimize workflows using artificial intelligence.",
  },
  {
    question: "What tasks can an AI agent perform?",
    answer:
      "It can reply on WhatsApp, schedule appointments, process forms, capture leads, closing sales, automate FAQs, and more—depending on the package you choose.",
  },
  {
    question: "Do I need technical knowledge to use it?",
    answer:
      "No, we handle all the setup and integration. You just provide access to your communication channels and we take care of the rest.",
  },
  {
    question: "Can the AI agent be customized for my business?",
    answer:
      "Yes, the agents are trained with your company’s information so they can speak just like a member of your team.",
  },
  {
    question: "Which platforms does the AI agent work on?",
    answer:
      "It can operate on WhatsApp, Messenger, Instagram, your website, and other platforms depending on the selected plan.",
  },
  {
    question: "How the free trial works?",
    answer:
      "The free trial is a 7-day's period where you can test the AI agent for free. During this time, you can evaluate its performance and see if it meets your needs. If you decide to continue using the AI agent, you can purchase a subscription plan.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="py-28 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-4xl font-bold leading-tight">
          Frequently Asked Questions
        </h2>
        <p className="mb-12 text-center text-base text-zinc-500">
          Have another question? Contact us on{" "}
          <a
            href="https://x.com/"
            target="_blank"
            className="font-bold leading-tight hover:text-blue-600 underline"
          >
            +57 3023278057
          </a>{" "}
          or by{" "}
          <a
            href="miguelmunoz@bloomify.tech"
            target="_blank"
            className="font-bold leading-tight hover:text-blue-600 underline"
          >
            email
          </a>
          .
        </p>

        <div className="space-y-[2px]">
          {faqs.map((faq, index) => (
            <div key={index} className="overflow-hidden">
              <button
                onClick={() => toggleQuestion(index)}
                className="flex w-full items-center justify-between bg-blue-600/60 px-6 py-4 text-left transition-colors hover:bg-blue-700"
              >
                <span className="text-[16px] font-medium text-white">
                  {faq.question}
                </span>
                <span className="ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700">
                  <PlusIcon
                    className={`h-3 w-3 text-white transition-transform duration-200 ${openIndex === index ? "rotate-45" : ""}`}
                  />
                </span>
              </button>
              <div
                className={`grid transition-all duration-200 ease-in-out ${
                  openIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="bg-blue-600/80 px-6 py-4 text-base text-white ">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlusIcon({ className = "" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
}
