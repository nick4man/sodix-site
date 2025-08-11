
export default function SlugPage({ params: { slug } }: { params: { slug: string[] } }) {
    return (
        <main>
            <h1>{slug.join('/')}</h1>
        </main>
    )
}
