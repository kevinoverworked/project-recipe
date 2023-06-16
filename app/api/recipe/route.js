import { NextResponse } from 'next/server';
import RecipeModel from "../../../src/models/RecipeModel";

export async function GET(request) {
    const { searchParams } = new URL(request.url),
        id = parseInt(searchParams.get("id")),
        recipeModel = new RecipeModel();
        
    if (id) {
        return NextResponse.json(
            await recipeModel.getOne(id)
        );
    }

    return NextResponse.json(
        await recipeModel.getAll()
    );
}

export async function POST(request) {
    const requestValues = await request.json(),
        recipeModel = new RecipeModel();
    
    return NextResponse.json(
        await recipeModel.createOne(requestValues)
    );
}

export async function PATCH(request) {
    const { searchParams } = new URL(request.url),
        id = parseInt(searchParams.get("id")),
        requestValues = await request.json(),
        recipeModel = new RecipeModel();
        
    await recipeModel.updateOne(id, requestValues);

    return NextResponse.json({sucess: `Recipe id ${id} was updated successfully`});
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url),
        id = parseInt(searchParams.get("id")),
        recipeModel = new RecipeModel();
    
    await recipeModel.deleteOne(id);

    return NextResponse.json({sucess: `Recipe id ${id} was deleted successfully`});
}