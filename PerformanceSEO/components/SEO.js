import Head from "next/head";

export default function SEO({ title, description }) {
    return (
        <HEAD>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="robots" content="index, follow" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </HEAD>
    );
}