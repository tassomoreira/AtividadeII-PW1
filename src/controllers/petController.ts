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
        };

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

async function updatePet(req:Request, res:Response) {
    try {
        const petshop = req.petshop;
        const { id } = req.params;
        const { name, type, description, deadline_vaccination } = req.body;

        const petData:Prisma.PetUpdateInput = {
            name,
            type,
            description,
            deadlineVaccination: new Date(deadline_vaccination)
        };

        const pet = await petService.updatePet(id, petshop.id, petData);

        res.status(200).json(pet);
    } catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === "P2025" || e.code === "P2023") {
                res.status(404).json({ error: "Não existe nenhum pet com id informado." });
                return;
            }
        }

        console.error("Erro ao tentar atualizar pet: " + e);
    }
}

async function vaccinatePet(req:Request, res:Response) {
    try {
        const petshop = req.petshop;
        const { id } = req.params;

        const pet = await petService.vaccinatePet(id, petshop.id);

        res.status(200).json(pet);
    } catch(e) {
        if(e instanceof Prisma.PrismaClientKnownRequestError) {
            if(e.code === "P2025" || e.code === "P2023") {
                res.status(404).json({ error: "Não existe nenhum pet com id informado." });
                return;
            }
        }

        console.error("Erro ao tentar marcar pet como vacinado: " + e);
    }
}

export default { createPet, findAllPets, updatePet, vaccinatePet };