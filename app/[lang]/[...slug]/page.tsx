

export default function SlugPage({ params }: { params: { slug: string[] } }) {
    console.log(params);
    return (
        <main>
            <h1>{params.slug.join('/')}</h1>
        </main>
    )
}
