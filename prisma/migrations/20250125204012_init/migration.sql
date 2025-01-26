-- CreateTable
CREATE TABLE "pets" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "vaccinated" BOOLEAN NOT NULL DEFAULT false,
    "deadline_vaccination" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "petshopId" UUID NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petshops" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,

    CONSTRAINT "petshops_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "petshops_cnpj_key" ON "petshops"("cnpj");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_petshopId_fkey" FOREIGN KEY ("petshopId") REFERENCES "petshops"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
