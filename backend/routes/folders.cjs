'use strict';

/** Routes for sample-entry. */

const jsonschema = require('jsonschema');
const express = require('express');
const { ensureLoggedIn } = require('../middleware/auth.cjs');
const { BadRequestError } = require('../expressError.cjs');
const Folder = require('../models/folders.cjs');
const folderEntrySchema = require('../schemas/folder.json');
const folderUpdateSchema = require('../schemas/folderUpdate.json');

const router = express.Router();

//GET /folders/[username] => {folder under the user name }*/
router.get('/:username', ensureLoggedIn, async function(req, res, next) {
	try {
		const folders = await Folder.getAllFolder(req.params.username);

		return res.json({ folders });
	} catch (err) {
		return next(err);
	}
});

/** POST /folders/add
 *
 * add include { folder_name }
 */

router.post('/add', ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, folderEntrySchema);

		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const newFolder = await Folder.add({ ...req.body });
		return res.status(201).json({ newFolder });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[id] { folderName } => { edited folderName }
 * Data can include:
 *   {folder_name}
 * Returns { folder_name as folderName}
 * must be loggedin
 **/
router.patch('/:id', ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, folderUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		console.log('{{{{{{}}}}}}', req.body);

		const editedFolder = await Folder.update(req.params.id, req.body);
		return res.json({ editedFolder });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[sample_id]  =>  { deleted: sample_id }
 */

router.delete('/:id', ensureLoggedIn, async function(req, res, next) {
	try {
		await Folder.remove(req.params.id);
		return res.json({ deleted: req.params.id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
