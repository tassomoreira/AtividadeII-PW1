import { Prisma } from "@prisma/client";

import prisma from "../prisma/client";

async function createPet(petData:Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
        data: petData
    });

    return pet;
}

export default { createPet };