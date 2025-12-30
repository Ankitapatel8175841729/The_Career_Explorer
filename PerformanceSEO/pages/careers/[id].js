import SEO from "../../components/SEO";
export default function CareerPage({ career }) {
    return (
        <>
            <SEO
                title={`${career.name} Career After 10th`}
                description={career.scope}
            />

            <h1>{career.name}</h1>
            <p>{career.eligibility}</p>
            <p>{career.salary}</p>
        </>
    );
}

export async function getServerSideProps({ params }) {
    const res = await fetch(
        `https://YOUR_REGION-YOUR_PROJECT.cloudfunctions.net/getCareer?id=${params.id}`
    );

    const career = await res.json();

    return { props: { career } };
}