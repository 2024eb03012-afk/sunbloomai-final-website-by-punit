import { PageHero } from "@/components/site/PageHero";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Contact & Partnerships",
  description:
    "Talk to Sunbloom AI about data collection and data operations partnerships, enterprise AI agents and automation, or AI evaluation projects.",
  path: "/contact",
  image: "contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        label="Contact & Partnerships"
        title="Talk to our team."
        intro="Tell us what you're building. Choose a pathway below or send a general inquiry, and we'll respond by email."
        image="contact"
        imagePosition="center 40%"
        compact
      />
      <ContactForm />
    </>
  );
}
