import { NextResponse } from 'next/server';
import UserModel from "../../../src/models/UserModel";

export async function GET(request) {
    const { searchParams } = new URL(request.url),
        id = parseInt(searchParams.get("id")),
        userModel = new UserModel();
        
    if (id) {
        return NextResponse.json(
            await userModel.getOne(id)
        );
    }

    return NextResponse.json(
        await userModel.getAll()
    );
}

export async function POST(request) {
    const requestValues = await request.json(),
        userModel = new UserModel();
    
    return NextResponse.json(
        await userModel.createOne(requestValues)
    );
}

export async function PATCH(request) {
    const { searchParams } = new URL(request.url),
        id = parseInt(searchParams.get("id")),
        requestValues = await request.json(),
        userModel = new UserModel();
        
    await userModel.updateOne(id, requestValues);

    return NextResponse.json({sucess: `User id ${id} was updated successfully`});
}

export async function DELETE(request) {
    const { searchParams } = new URL(request.url),
        id = parseInt(searchParams.get("id")),
        userModel = new UserModel();
    
    await userModel.deleteOne(id);

    return NextResponse.json({sucess: `User id ${id} was deleted successfully`});
}