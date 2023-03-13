const { Router } = require("express");
const { config } = require("../configs/config");
const controllers = require("./controllers");
const router = Router();

// router.get(config.api_paths.read, controllers.ReadRecord);

router.get(config.api_paths.readbooks, controllers.readBooksRecord);

router.get(config.api_paths.readstudents, controllers.readStudentsRecord);

router.get(config.api_paths.readassign, controllers.readBookAssignRecord);

router.post(config.api_paths.student_register, controllers.AddStudentsRecord);
router.post(config.api_paths.book_register, controllers.AddBooksRecord);

router.post(config.api_paths.book_assign, controllers.AddBookAssignRecord);

router.post(config.api_paths.book_search, controllers.searchBook);

module.exports = router;
