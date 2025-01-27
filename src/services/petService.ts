import { Petshop, Prisma } from "@prisma/client";

import prisma from "../prisma/client";

async function createPet(petData:Prisma.PetCreateInput) {
    const pet = await prisma.pet.create({
        data: petData
    });

    return pet;
}

async function findAllPets(petshopId:string) {
    const pets = await prisma.pet.findMany({
        where: {
            petshopId
        },
        select: {
            id: true,
            name: true,
            type: true,
            description: true,
            vaccinated: true,
            deadlineVaccination: true,
            createdAt: true,
            petshopId: false
        }
    });

    return pets;
}

export default { createPet, findAllPets };