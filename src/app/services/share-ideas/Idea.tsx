import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/text-area"
import { Button } from "@/components/ui/button"

function Idea() {

return (
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
)}

export { Idea }