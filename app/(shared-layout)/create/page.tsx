"use client"


import { createPlaceAction } from "@/app/actions";
import { placeSchema } from "@/app/schemas/place";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { categories, locations } from "@/lib/helpers/constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import z from "zod";

export default function CreateRoute() {
    const [isPending, startTransition] = useTransition();


    const form = useForm({
        resolver: zodResolver(placeSchema)
        , defaultValues: {
            name: "",
            description: "",
            image: undefined,
            category: "",
            location: "",

        }
    });

    function onSubmit(values: z.infer<typeof placeSchema>) {
        startTransition(async () => {

            console.log(values);


              await createPlaceAction(values);

        })


    }

    return (
        <div className="py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">Create Place</h1>
                <p className="text-xl text-muted-foreground pt-4">Share your thoughts with the world</p>
            </div>

            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create Place</CardTitle>
                    <CardDescription>Create a new place</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FieldGroup className="gap-y-4">
                            <Controller name="name" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input aria-invalid={fieldState.invalid} placeholder="Super cool title" {...field} />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )} />

                            <Controller name="description" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Description</FieldLabel>
                                        <Textarea aria-invalid={fieldState.invalid} placeholder="Super cool blog content" {...field} />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )} />

                            <div className="flex gap-5">
                                <Controller name="location" control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field >
                                            <FieldLabel>Location</FieldLabel>
                                            <Select 
                                            
                                            
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                }}
                                                
                                            >
                                                <SelectTrigger className="w-45">
                                                    <SelectValue placeholder="Location" />
                                                </SelectTrigger>
                                                <SelectContent> 
                                                    <SelectGroup >
                                                        <SelectLabel>Location</SelectLabel>
                                                        {locations.map((location, key) => {
                                                            return <SelectItem key={key} value={location}>{location}</SelectItem>
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid &&
                                                <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )} />
                                <Controller name="category" control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field>
                                            <FieldLabel>Category</FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={(value) => {
                                                    field.onChange(value)
                                                }} >
                                                <SelectTrigger className="w-45">
                                                    <SelectValue placeholder="Category" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Category</SelectLabel>
                                                        {categories.map((cat, key) => {
                                                            return <SelectItem key={key} value={cat}>{cat}</SelectItem>
                                                        })}
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid &&
                                                <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )} />

                            </div>

                            <Controller name="image" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Image</FieldLabel>
                                        <Input
                                            type="file"
                                            aria-invalid={fieldState.invalid}
                                            placeholder="Super cool blog content"
                                            accept="image/*"
                                            onChange={(event) => {
                                                const file = event.target.files?.[0];
                                                field.onChange(file);
                                            }}
                                        />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )} />
                            <Button className="mt-3" disabled={isPending}>
                                {isPending ? (
                                    <>
                                        <Loader2 className="size-4 animate-spin" />
                                        <span>Loading...</span>
                                    </>
                                ) : (<span>Create Place</span>)}
                            </Button>
                        </FieldGroup>

                    </form>
                </CardContent>
            </Card>

        </div>
    )
}