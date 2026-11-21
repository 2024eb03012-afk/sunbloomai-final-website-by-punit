import { Prose, TextPage } from "@/components/site/TextPage";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "Terms governing use of the Sunbloom AI website.",
  path: "/terms",
});

// NOTE: Baseline terms written for the site relaunch. Have them reviewed by
// legal counsel and update the date below before relying on them.
const UPDATED = "21 November 2026";

export default function TermsPage() {
  return (
    <TextPage label="Legal" title="Terms and Conditions" intro={`Last updated ${UPDATED}`}>
      <Prose>
        <p>
          These terms govern your use of sunbloomai.com. By using the website you agree to them. Services provided by
          Sunbloom AI to clients are governed by separate written agreements.
        </p>

        <h2>Use of the website</h2>
        <p>
          You may use this website for lawful purposes only. You must not attempt to disrupt, misuse or gain
          unauthorised access to the website or its underlying systems.
        </p>

        <h2>Content</h2>
        <p>
          The content on this website is provided for general information about Sunbloom AI and its services. It does
          not constitute an offer or a binding description of any service. Descriptions of capabilities may change as
          our services develop.
        </p>

        <h2>Intellectual property</h2>
        <p>
          Unless otherwise stated, the website&rsquo;s design, text and branding belong to Sunbloom AI. Photography is
          used under licence from its respective owners.
        </p>

        <h2>Third-party links and services</h2>
        <p>
          The website links to and embeds third-party services. We are not responsible for their content or practices.
        </p>

        <h2>Liability</h2>
        <p>
          The website is provided &ldquo;as is&rdquo;. To the extent permitted by law, we are not liable for losses
          arising from your use of the website.
        </p>

        <h2>Changes</h2>
        <p>We may update these terms from time to time. The date above shows when they last changed.</p>

        <h2>Contact</h2>
        <p>
          Questions about these terms can be sent to <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </Prose>
    </TextPage>
  );
}
