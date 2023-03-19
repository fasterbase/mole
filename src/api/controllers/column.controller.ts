import express from "express";

const router = express.Router();


router.put("/add", async (req, res) => {
    try {
        const { columnId, tableId } = req.body;

        //TODO: Insert columnId into tableId

        res.status(201).json("Column created successfully.");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:columnId/:tableId", async (req, res) => {
    try {
        const { columnId, tableId } = req.params;

        //TODO: Delete columnId from tableId

        res.status(200).json({ message: "Column deleted" });
    } catch (error) {
        res.status(500).json(error);
    }
});

export default router;
