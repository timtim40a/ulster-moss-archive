import { Footer, Header, NAV_ITEMS } from "@/components/ulster-moss";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <Header title="Ulster Moss Archive" nav={NAV_ITEMS} />
      <main className={styles.main}>
        <section>
          <h1 className="display-md">Welcome</h1>
          <p className={`body ${styles.lead}`}>
            The Ulster Moss Archive is a field record for objects the coast has half
            reclaimed. More to come.
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
