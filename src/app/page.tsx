import { Card, Footer, Header, Label, PhotoCard } from "@/components/ulster-moss/UlsterMoss";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header
        title="Ulster Moss Archive"
        nav={[
          { label: "Archive", href: "#archive" },
          { label: "Objects", href: "#objects" },
          { label: "Contact", href: "#contact" },
        ]}
      />
      <main className={styles.main}>
        <section id="archive">
          <p className={`quote ${styles.lead}`}>Traces of a landscape, reframed.</p>
        </section>

        <section id="objects" className={styles.objects}>
          <Card
            title="Fragment, Ulster Moss"
            rows={[
              {
                value:
                  "Recovered from peat, six centimetres below the surface. Surface worn smooth; no visible tool marks.",
              },
              { label: "Location", value: "54.6°N, 6.2°W" },
              { label: "Date found", value: "14 March 1987" },
              { label: "Material", value: "Bog oak" },
            ]}
            photos={[
              { src: "/photos/photo-focus.jpg", alt: "Bog oak fragment, front face" },
              { src: "/photos/photo-plinth.jpg", alt: "Fragment on display plinth" },
              { src: "/photos/photo-detail.jpg", alt: "Detail of the worn surface" },
            ]}
          />

          <Label tone="accent">Origin unconfirmed</Label>

          <Card
            title="Vessel, partial"
            rows={[
              { value: "Rim and shoulder only. Base missing. Interior carries a faint ash residue." },
              { label: "Location", value: "54.6°N, 6.2°W" },
              { label: "Date found", value: "2 September 1991" },
              { label: "Material", value: "Coarse earthenware" },
            ]}
            photos={[
              { src: "/photos/photo-plinth.jpg", alt: "Vessel fragment on plinth" },
              { src: "/photos/photo-detail.jpg", alt: "Detail of the rim" },
            ]}
          />
        </section>
      </main>
      <div id="contact">
        <Footer
          heading="Get in touch"
          blurb="Enquiries about specific objects, provenance, or loan requests."
        />
      </div>
    </>
  );
}
