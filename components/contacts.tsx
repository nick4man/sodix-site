
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Contacts = () => {
    return (
        <section className="container py-12">
            <h2 className="text-3xl font-bold text-center mb-8">Contact Us</h2>
            <Card>
                <CardHeader>
                    <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="grid grid-cols-1 gap-4">
                        <input type="text" placeholder="Name" className="border p-2 rounded-md" />
                        <input type="email" placeholder="Email" className="border p-2 rounded-md" />
                        <textarea placeholder="Message" className="border p-2 rounded-md"></textarea>
                        <Button>Send</Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    )
}
