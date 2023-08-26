'use client'
import { useEffect, useState } from "react"

import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/text-area"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2 } from 'lucide-react';

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { IdeasRequest, IdeasRequestSchema } from "@/lib/schema";
import { set } from "zod"

type Idea = {
    id: string
    description: string
}

function Ideas( { serverIdeas } : { serverIdeas:  Idea[] }) {

const supabase = createClientComponentClient();

const {
    register,
    handleSubmit,
    formState: { errors },
} = useForm<IdeasRequest>({
    resolver: zodResolver(IdeasRequestSchema),
    defaultValues: {
        description: "",
    },
})

const [processing, setProcessing] = useState<boolean>(false)

const onSubmit = async (data: IdeasRequest) => {
    console.log(data)
    setProcessing(true)

    const { data: { user } } = await supabase.auth.getUser()
    const {
        data: ideas,
    } = await supabase.from('ideas').select().match({ user_id: user?.id });

    if (ideas != null && ideas.length >= 3) {
        alert('You can only share 3 ideas')
        setProcessing(false)
        return
    }

    const { error } = await supabase
    .from('ideas')
    .insert({ 
        description: data.description,
    })

    setProcessing(false)

    if (error) {         
    console.error(error)
    }

    setProcessing(false)
}

const handleDelete = async (id : number) => {
    const { data: { user } } = await supabase.auth.getUser()
    const { error } = await supabase
    .from('ideas')
    .delete()
    .match({ id: id, user_id: user?.id })

    if (error) {         
    console.error(error)
    }
}

const [ideas, setIdeas] = useState<Idea[]>(serverIdeas ?? [])

useEffect(() => {
    const channel = supabase
        .channel('realtime ideas')
        .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ideas' }, payload => {
            console.log('Change received!', payload)
            setIdeas((ideas) => [...ideas, payload.new as Idea])
        })
        .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'ideas' }, payload => {
            console.log('Change received!', payload)
            setIdeas((ideas) => ideas.filter((idea) => idea.id !== payload.old.id))
        })
        .subscribe()  
    return () => {
        supabase.removeChannel(channel)
    }
}, [supabase, ideas, setIdeas])

return (
    <>
    <form 
    onSubmit={handleSubmit(onSubmit)}
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
                    {...register("description")}
                />
                {errors.description && errors.description?.message && (
                    <p className="text-sm text-destructive">
                        {errors.description?.message}
                    </p>
                )}
            </div>
            <div className="flex justify-end mt-2">
                <Button type="submit" disabled={processing}>
                    {processing ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </>
                    ) : (
                        "Submit"
                    )}
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
                <span className="cursor-pointer" onClick={()=>handleDelete(idea.id)}><Trash2 className="text-red-500 dark:text-red-700" /></span>
            </div>
        ))}
        </div>
    </div>
    </>
)}

export { Ideas }