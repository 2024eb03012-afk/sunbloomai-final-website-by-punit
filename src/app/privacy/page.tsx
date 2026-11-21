import { Prose, TextPage } from "@/components/site/TextPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How Sunbloom AI handles information submitted through sunbloomai.com.",
  path: "/privacy",
});

// NOTE: Baseline policy written for the site relaunch. Have it reviewed by
// legal counsel and update the date below before relying on it.
const UPDATED = "21 November 2026";

export default function PrivacyPage() {
  return (
    <TextPage label="Legal" title="Privacy Policy" intro={`Last updated ${UPDATED}`}>
      <Prose>
        <p>
          This policy explains how Sunbloom AI (&ldquo;we&rdquo;, &ldquo;us&rdquo;) handles information collected
          through sunbloomai.com. It summarises our current practices and will be updated as our services evolve.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong className="text-white">Information you provide</strong>: when you submit an inquiry, email us or book
            a call, we receive details such as your name, work email, company, job title and the information you share
            about your project.
          </li>
          <li>
            <strong className="text-white">Technical information</strong>: our hosting provider may process standard
            server logs (such as IP address, browser type and pages requested) to operate and secure the website.
          </li>
        </ul>

        <h2>How we use it</h2>
        <ul>
          <li>To respond to your inquiry and discuss potential work with you.</li>
          <li>To operate, maintain and secure the website.</li>
          <li>To meet legal obligations.</li>
        </ul>
        <p>We do not sell your personal information.</p>

        <h2>Third-party services</h2>
        <p>
          We use third-party providers to host the website, receive inquiries and schedule calls (for example, our
          booking page on Cal.com). Some pages include an AI voice assistant provided by ElevenLabs; if you choose to
          use it, your conversation is processed by that provider. These services process information under their own
          terms and privacy policies.
        </p>

        <h2>Retention</h2>
        <p>
          We keep inquiry information for as long as needed to respond and to manage any resulting relationship, and
          delete it when it is no longer required.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to access, correct or delete the personal information we hold about you by emailing{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Prose>
    </TextPage>
  );
}
