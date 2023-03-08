'use strict';

/** Routes for sample-entry. */

const jsonschema = require('jsonschema');
const express = require('express');

const { BadRequestError } = require('../expressError');
const SampleEntry = require('../models/sample-entry');
const sampleEntrySchema = require('../schemas/sampleEntrySchema.json');

const router = express.Router();
