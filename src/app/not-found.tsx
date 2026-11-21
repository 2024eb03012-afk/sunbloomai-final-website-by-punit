import { TextPage } from "@/components/site/TextPage";
import { ButtonLink } from "@/components/site/Button";

export default function NotFound() {
  return (
    <TextPage label="404" title="This page could not be found." intro="The page may have moved as part of our new site.">
      <section className="border-t border-line bg-ink">
        <div className="shell flex flex-wrap gap-x-8 gap-y-5 py-20">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/contact" variant="text">
            Talk to our team
          </ButtonLink>
        </div>
      </section>
    </TextPage>
  );
}
