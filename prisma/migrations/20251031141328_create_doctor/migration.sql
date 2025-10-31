-- CreateTable
CREATE TABLE "public"."doctors" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "speciality_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "doctors_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "doctors_email_key" ON "public"."doctors"("email");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_crm_key" ON "public"."doctors"("crm");

-- CreateIndex
CREATE UNIQUE INDEX "doctors_user_id_key" ON "public"."doctors"("user_id");

-- AddForeignKey
ALTER TABLE "public"."doctors" ADD CONSTRAINT "doctors_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."doctors" ADD CONSTRAINT "doctors_speciality_id_fkey" FOREIGN KEY ("speciality_id") REFERENCES "public"."specialities"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
