import SEO from "../components/SEO";
export default function Home({ careers }) {
    return (
        <>
            <SEO
                title="Career Explorer After 10th"
                description="EXplore best career options after 10th grade in India"
            />

            <h1>Career Explorer</h1>
            {careers.map(c => (
                <p key={c.id}>{c.name}</p>
            ))}
        </>
    );
}

export async function getServerSideProps() {
    const res = await fetch(
        "https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/getCareers"
    );

    const careers = await res.json();
    return { props: { careers } };
}