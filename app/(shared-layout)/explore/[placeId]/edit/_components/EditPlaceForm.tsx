"use client"


import { editPlaceAction } from "@/app/actions";
import { placeSchema } from "@/app/schemas/place";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { categories, Category, locations, Location } from "@/lib/helpers/constants";
import { zodResolver } from "@hookform/resolvers/zod";

import { Loader2 } from "lucide-react";

import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import z from "zod";


export default function EditPlaceForm({placeId, place}:
    {placeId: Id<'places'>, place: Doc<"places"> }
) {
    const [isPending, startTransition] = useTransition();


    const form = useForm({
        resolver: zodResolver(placeSchema)
        , defaultValues: {
            name: place.name,
            description: place.description,
            image: undefined,
            category: place.category as Category,
            location: place.location as Location,
            address: place.address

        }
    });

    function onSubmit(values: z.infer<typeof placeSchema>) {
        startTransition(async () => {


              await editPlaceAction(placeId, values, place);

        })


    }

    return (
   
           
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
                                     <Controller name="address" control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field>
                                        <FieldLabel>Address</FieldLabel>
                                        <Input aria-invalid={fieldState.invalid} placeholder="Address" {...field} />
                                        {fieldState.invalid &&
                                            <FieldError errors={[fieldState.error]} />}
                                    </Field>
                                )} />

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
                                ) : (<span>Update Place</span>)}
                            </Button>
                        </FieldGroup>

                    </form>
     

    )
}