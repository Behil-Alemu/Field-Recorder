'use strict';

/** Routes for sample-entry. */

const jsonschema = require('jsonschema');
const express = require('express');
const { ensureLoggedIn } = require('../middleware/auth');
const { BadRequestError } = require('../expressError');
const SampleEntry = require('../models/sample-entry');
const sampleEntrySchema = require('../schemas/sampleEntrySchema.json');
const sampleUpdateSchema = require('../schemas/sampleUpdate.json');

const router = express.Router();

//GET /[username, folderName] => {samples }*/
router.get('/:folderName/:username', ensureLoggedIn, async function(req, res, next) {
	try {
		const samples = await SampleEntry.getAllSample(req.params.username, req.params.folderName);
		return res.json({ samples });
	} catch (err) {
		return next(err);
	}
});

/** POST /sample-entry/add
 *
 * add include { common_name, scientific_name, quantity, location, image_url, note }
 */

router.post('/add', ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, sampleEntrySchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}

		const newSample = await SampleEntry.add({ ...req.body });
		return res.status(201).json({ newSample });
	} catch (err) {
		return next(err);
	}
});

/** PATCH /[sampe_id] { samples } => { edited sample }
 *
 * Data can include:
 *   { common_name, scientific_name, quantity, location, image_url, note}
 *
 * Returns { sample_id, commonName, scientificName, quantity, location, imageUrl, note, timestamp, folder_id  }
 *
 * must be loggedin
 **/
router.patch('/:sample_id', ensureLoggedIn, async function(req, res, next) {
	try {
		const validator = jsonschema.validate(req.body, sampleUpdateSchema);
		if (!validator.valid) {
			const errs = validator.errors.map((e) => e.stack);
			throw new BadRequestError(errs);
		}
		const editedSample = await SampleEntry.update(req.params.sample_id, req.body);
		return res.json({ editedSample });
	} catch (err) {
		return next(err);
	}
});

/** DELETE /[sample_id]  =>  { deleted: sample_id }
 */

router.delete('/:sample_id', ensureLoggedIn, async function(req, res, next) {
	try {
		await SampleEntry.remove(req.params.username);
		return res.json({ deleted: req.params.sample_id });
	} catch (err) {
		return next(err);
	}
});

module.exports = router;
