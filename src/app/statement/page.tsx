import { Footer, Header, NAV_ITEMS } from "@/components/ulster-moss";
import styles from "../page.module.css";

export default function Statement() {
  return (
    <>
      <Header title="Statement" nav={NAV_ITEMS} />
      <main className={styles.main}>
        <section>
          <p className={`body ${styles.lead}`}>
            This archive gathers what the coast has half reclaimed: fragments, vessels,
            and traces recovered from Ulster Moss over three decades of fieldwork. Each
            object is presented as found, without restoration, so that the marks of
            weather, peat, and time remain legible alongside the marks of use.
          </p>
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
