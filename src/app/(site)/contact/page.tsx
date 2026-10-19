import { ContactForm } from "@/components/ContactForm/ContactForm";
import { sanityFetch } from "@/sanity/fetch";
import { CONTACT_PAGE_QUERY } from "@/sanity/queries";
import styles from "./page.module.css";

interface ContactPage {
    title: string | null;
    intro: string | null;
    email: string | null;
    phone: string | null;
    address: string | null;
    hours: string | null;
    formIntro: string | null;
}

export default async function ContactTheArchive() {
    const contact = await sanityFetch<ContactPage | null>({ query: CONTACT_PAGE_QUERY, tags: ["contactPage"] });

    // Rows with no value are left out.
    const details = [
        { label: "Email", value: contact?.email },
        { label: "Phone", value: contact?.phone },
        { label: "Location", value: contact?.address },
        { label: "Hours", value: contact?.hours },
    ].filter((detail) => detail.value);

    return (
        <main className={styles.main}>
            <div className={styles.info}>
                {contact?.title && <h1 className={`${styles.heading} display-lg`}>{contact.title}</h1>}
                {contact?.intro && <p className="body">{contact.intro}</p>}
                {details.length > 0 && (
                    <ul className={styles.infoList}>
                        {details.map(({ label, value }) => (
                            <li key={label}>
                                <span className={`${styles.infoLabel} eyebrow`}>{label}</span>
                                <span className={`${styles.infoValue} body`}>{value}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <ContactForm heading="Send an enquiry" blurb={contact?.formIntro ?? undefined} />
        </main>
    );
}
