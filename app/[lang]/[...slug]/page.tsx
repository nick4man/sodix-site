

export default async function SlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const resolvedParams = await params;
    console.log(resolvedParams);
    return (
        <main>
            <h1>{resolvedParams.slug.join('/')}</h1>
        </main>
    )
}
