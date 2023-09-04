"use client"

import * as React from "react"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/cn"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { useRouter } from 'next/navigation';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

import { Profile, ProfileSchema } from "@/lib/schema";

export default function Profile() {

    const supabase = createClientComponentClient();

    const router = useRouter();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Profile>({
        resolver: zodResolver(ProfileSchema),
        defaultValues: {
            username: "",
            firstname: "",
            lastname: "",
        },
    })

    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function onSubmit(data : Profile) {
        setIsLoading(true)

        const { data: { user } } = await supabase.auth.getUser()
        console.log({ user });
        const {
            data: profiles,
        } = await supabase.from('profiles').select().match({ id: user?.id });
        console.log({ profiles });

        if (profiles != null) {
            
            const { error } = await supabase
            .from('profiles')
            .update({ 
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,     
            })
            .eq('id', user?.id)

            console.log({ error });

        } else {

            const { error } = await supabase
            .from('profiles')
            .insert({
                id: user?.id, 
                username: data.username,
                firstname: data.firstname,
                lastname: data.lastname,
            })

            console.log({ error });

        }

        setIsLoading(false)

    }

    return (
        <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2">
                    <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="username">
                            Username
                        </Label>
                        <Input
                            id="username"
                            placeholder="username"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="username"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("username")}
                        />
                        {errors?.username && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.username.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="firstname">
                            Firstname
                        </Label>
                        <Input
                            id="firstname"
                            placeholder="firstname"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="firstname"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("firstname")}
                        />
                        {errors?.firstname && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.firstname.message}
                            </p>
                        )}
                        <Label className="sr-only" htmlFor="lasttname">
                            Lastname
                        </Label>
                        <Input
                            id="lastname"
                            placeholder="lastname"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="lastname"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("lastname")}
                        />
                        {errors?.lastname && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.lastname.message}
                            </p>
                        )}
                    </div>
                    <button
                        className={cn(buttonVariants())}
                        disabled={isLoading}
                        type="submit"
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}