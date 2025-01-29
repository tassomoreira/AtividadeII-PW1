import { Prisma } from "@prisma/client";

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
        omit: {
            petshopId: true
        }
    });

    return pets;
}

async function updatePet(id:string, petshopId:string, petData:Prisma.PetUpdateInput) {
    const pet = await prisma.pet.update({
        where: {
            id,
            petshopId
        },
        data: petData,
        omit: {
            petshopId: true
        }
    });

    return pet;
}

async function vaccinatePet(id:string, petshopId:string) {
    const pet = await prisma.pet.update({
        where: {
            id,
            petshopId
        },
        data: {
            vaccinated: true
        },
        omit: {
            petshopId: true
        }
    });

    return pet;
}

async function deletePet(id:string, petshopId:string) {
    const pet = await prisma.pet.delete({
        where: {
            id,
            petshopId
        }
    });
}

export default { createPet, findAllPets, updatePet, vaccinatePet, deletePet };