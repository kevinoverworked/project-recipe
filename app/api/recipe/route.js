import { NextResponse } from 'next/server';
import RecipeModel from "../../../models/RecipeModel";

export async function GET(request) {
    console.log(request.body)
    return NextResponse.json({ name: "John Doe" });
}

export async function POST(request) {
    const requestValues = await request.json(),
        recipeModel = new RecipeModel(),
        recipe = await recipeModel.createOne(requestValues);
    
    return NextResponse.json(recipe);
}