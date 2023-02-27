const { Router } = require("express");
const controllers = require("./controllers");
const router = Router();

router.get("/read", controllers.ReadRecord);

router.put("/read", controllers.UpdateRecord);
router.delete("/delete", controllers.DeleteRecord);
router.post("/students/register", controllers.AddStudentsRecord);
router.post("/books/register", controllers.AddBooksRecord);
router.post("/books/assign", controllers.AddBookAssignRecord);
router.post("/books/search", controllers.searchBook);

module.exports = router;
