import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/text-area"
import { Button } from "@/components/ui/button"
import { Trash2 } from 'lucide-react';

import { supabase } from "@/config/supabase"

async function Idea() {

const {
    data: ideas,
} = await supabase.from('ideas').select();

return (
    <>
    <form
    className="flex flex-col md:flex-row gap-10"
    >
        <div className="max-w-[400px] md:max-w-[500px]">
            <div className="grid w-full items-center gap-2">
                <Label htmlFor="website">Describe your idea</Label>
                <Textarea
                    id="text"
                    rows={10}
                    className="text-md w-[400px] md:w-[500px] h-[200px]"
                    placeholder="Enter your idea here..."
                />
            </div>
            <div className="flex justify-end mt-2">
                <Button type="submit" disabled>
                    Submit
                </Button>
            </div>
        </div>
    </form>
    <div className="md:w-[500px] items-center">
        <h1 className="text-2xl font-bold mb-5">Your shared ideas</h1>
        <div className="flex flex-col">
        {ideas && ideas.map((idea) => (
            <div key={idea.id} className="flex justify-between p-5 border border-input shadow rounded-[12px] dark:border-slate-900 dark:shadow-slate-900 mb-3">
                <div>{idea.description}</div>
                <Trash2 className="text-red-500 dark:text-red-700"/>
            </div>
        ))}
        </div>
    </div>
    </>
)}

export { Idea }