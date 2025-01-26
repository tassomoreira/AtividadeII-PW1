import { Request, Response, NextFunction } from "express";

import petshopService from "../services/petshopService";
import cnpjUtils from "../utils/cnpjUtils";

async function checkExistsUserAccount(req:Request, res:Response, next:NextFunction) {
    const { cnpj, username } = req.headers;

    if(typeof cnpj !== "string") {
        res.status(400).json({ error: "Informe o CNPJ no header da requisição corretamente." });
        return;
    }

    if(typeof username !== "string") {
        res.status(400).json({ error: "Informe o username no header da requisição corretamente." });
        return;
    }

    if(!cnpjUtils.isCnpjFormatValid(cnpj)) {
        res.status(400).json({ error: "O CNPJ informado não está no formato correto (XX.XXX.XXX/0001-XX)." });
        return;
    }

    const petshop = await petshopService.findPetshopByCnpj(cnpj);

    if(petshop === null) {
        res.status(404).json({ error: `Usuário '${username}' com CNPJ ${cnpj} não existe.` });
        return;
    }

    req.petshop = petshop;

    next();
}

export default checkExistsUserAccount;