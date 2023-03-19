import express from "express";
import { Request, Response } from "express";
import { TableData } from "../../orm/entities/table.entity";
import { tableRepository, connect } from "../../orm/connection";

const router = express.Router();

/**
 * This endpoint is supposed to return table data value to cheetah.
 */
router.get("/:tableId", async (req: Request, res: Response): Promise<void> => {
    try {
        const { tableId } = req.params;

        await connect();
        if (tableRepository) {
            const table = await tableRepository
                .createQueryBuilder("tableData")
                .where({ tableId: tableId })
                .getOne();
            if (table) {
                res.status(200).json({ table });
            } else {
                res.status(404).json({ message: "Table not found" });
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/create", async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, tableId, columns } = req.body;

        //TODO: Do something with columns

        await connect();

        if (tableRepository) {
            const table = new TableData();
            table.name = name;
            table.tableId = tableId;
            await tableRepository.save(table);
            res.status(201).json("Table created successfully.");
        }

        res.status(500).json("tableRepository doesn't exist");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete( "/:tableId", async (req: Request, res: Response): Promise<void> => {
    try {
        const { tableId } = req.params;

        await connect();
        if (tableRepository) {
            const table = await tableRepository
                .createQueryBuilder("tableData")
                .where({ tableId: tableId })
                .getOne();
            if (table) {
                await tableRepository.remove(table);
                res.status(200).json({ message: "Table deleted" });
            } else {
                res.status(404).json({ message: "Table not found" });
            }
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
