import { Request, Response } from "express";

import petshopService from "../services/petshopService";
import cnpjUtils from "../utils/cnpjUtils";

async function createPetshop(req:Request, res:Response) {
    try {
        const { name, cnpj } = req.body;

        if(!cnpjUtils.isCnpjFormatValid(cnpj)) {
            res.status(400).json({ error: "O CNPJ informado não está no formato correto (XX.XXX.XXX/0001-XX)." });
            return;
        }

        if(!await cnpjUtils.isCnpjUnique(cnpj)) {
            res.status(400).json({ error: "Já existe um petshop com o CNPJ informado." });
            return;
        }

        const petshop = await petshopService.createPetshop(name, cnpj);

        res.status(201).json(petshop);
    } catch(e) {
        console.error("Erro ao tentar criar petshop: " + e);
    }
}

export default { createPetshop };