/**
 * A single fighter jet crossing the hero sky left to right on a shallow climb,
 * pulling its contrails behind it.
 * Purely decorative: hidden from assistive tech and under reduced-motion.
 */

export function FighterJets() {
  return (
    <div aria-hidden="true" className="jet-sky motion-reduce:hidden">
      <div className="jet-flight">
        {/* Plain <img>: the asset is already sized for its slot and must not be
            lazy-loaded, or it would pop in part-way through the first pass. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/fighter-jet.webp" alt="" className="jet" decoding="async" />
      </div>
    </div>
  );
}
