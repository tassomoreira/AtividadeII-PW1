import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import petService from "../services/petService";

async function createPet(req:Request, res:Response) {
    try {
        const petshop = req.petshop;
        const { name, type, description, deadline_vaccination } = req.body;

        const petData:Prisma.PetCreateInput = {
            name,
            type,
            description,
            deadlineVaccination: new Date(deadline_vaccination),
            petshop: {
                connect: { id: petshop.id }
            }
        }

        const pet = await petService.createPet(petData);

        res.status(201).json(pet);
    } catch(e) {
        console.error("Erro ao tentar criar pet: " + e);
    }
}

async function findAllPets(req:Request, res:Response) {
    try {
        const petshop = req.petshop;

        const pets = await petService.findAllPets(petshop.id);

        res.status(200).json(pets);
    } catch(e) {
        console.error("Erro ao tentar buscar todos os pets: " + e);
    }
}

export default { createPet, findAllPets };