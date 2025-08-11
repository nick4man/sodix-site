import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionary";

export const Contacts = async ({ lang }: { lang: string }) => {
    const dictionary = await getDictionary(lang);
    return (
        <section className="container py-12">
            <h2 className="text-3xl font-bold text-center mb-8">{dictionary.contacts.title}</h2>
            <Card>
                <CardHeader>
                    <CardTitle>{dictionary.contacts.form.message}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 gap-4">
                        <input type="text" placeholder={dictionary.contacts.form.name} className="border p-2 rounded-md" />
                        <input type="email" placeholder={dictionary.contacts.form.email} className="border p-2 rounded-md" />
                        <textarea placeholder={dictionary.contacts.form.message} className="border p-2 rounded-md"></textarea>
                        <Button>{dictionary.contacts.form.send}</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}