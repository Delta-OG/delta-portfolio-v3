import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQAccordion() {
  const faqs = [
    {
      question: "What technologies do you use?",
      answer:
        "I primarily work with JavaScript, Python, React, Node.js, and various web technologies. I'm always learning new tools and frameworks to stay current with industry trends.",
    },
    {
      question: "How can I contact you?",
      answer:
        "You can reach me through Discord (@deltaexe), email (abdessamadk77@gmail.com), or connect with me on GitHub and Twitter using the quick links above.",
    },
    {
      question: "What kind of projects do you work on?",
      answer:
        "I work on a variety of projects including web applications, Discord bots, portfolio websites, and creative coding projects. I enjoy both frontend and backend development.",
    },
    {
      question: "Are you available for freelance work?",
      answer:
        "Yes! I'm open to freelance opportunities and collaborations. Feel free to reach out through any of the contact methods above to discuss your project.",
    },
    {
      question: "What's your development setup?",
      answer:
        "I primarily use Visual Studio Code for development, work with modern frameworks like Next.js and React, and enjoy experimenting with new technologies and tools.",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6 text-foreground">Frequently Asked Questions</h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
