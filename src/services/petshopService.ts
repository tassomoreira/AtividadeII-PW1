import prisma from "../prisma/client"

async function createPetshop(name:string, cnpj:string) {
    const petshop = await prisma.petshop.create({
        data: {
            name,
            cnpj,
        }
    });

    return petshop;
}

async function findAllPetshops() {
    const petshops = await prisma.petshop.findMany();

    return petshops;
}

async function findPetshopByCnpj(cnpj:string) {
    const petshop = await prisma.petshop.findUnique({
        where: {
            cnpj
        }
    });

    return petshop;
}

const petshopService = { createPetshop, findAllPetshops, findPetshopByCnpj };
export default petshopService;