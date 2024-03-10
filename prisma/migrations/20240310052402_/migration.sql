-- AlterTable
ALTER TABLE "Subtask" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "isComplete" BOOLEAN NOT NULL DEFAULT false;
