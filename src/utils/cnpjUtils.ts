import petshopService from "../services/petshopService";

function isCnpjFormatValid(cnpj:string) {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/0001-\d{2}$/;
    
    return cnpjRegex.test(cnpj);
}

async function isCnpjUnique(cnpj:string) {
    const petshops = await petshopService.findAllPetshops();

    return petshops.every(petshop => petshop.cnpj !== cnpj);
}

export default { isCnpjFormatValid, isCnpjUnique };