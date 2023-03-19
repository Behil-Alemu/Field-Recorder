'use strict';

const db = require('../db');
const { NotFoundError } = require('../expressError');
const { sqlForPartialUpdate } = require('../helpers/sql');

class SampleEntry {
	/**add sample info to sample_col data.
   *
   * data should be { common_name, scientific_name, quantity, location, image_url, note  }
   *
   * Returns { sample_id, commonName, scientificName, quantity, location, imageUrl, note, timestamp, folder_id  }
   **/

	static async add(data) {
		const result = await db.query(
			`INSERT INTO sample_entry (common_name,                 
            scientific_name, 
            quantity, 
            location, 
            image_url, 
            note,username,
             folder_id)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
           RETURNING sample_id, common_name AS "commonName", scientific_name AS "scientificName", quantity, 
           location, 
           image_url AS "imageUrl", 
           note`,
			[
				data.commonName,
				data.scientificName,
				data.quantity,
				data.location,
				data.imageUrl,
				data.note,
				data.username,
				data.folderId
			]
		);
		let SampleEntry = result.rows[0];

		return SampleEntry;
	}
	/** Get all samples in a folder 
   *
  
   * Returns [{ sample_id, commonName, scientificName, quantity, location, imageUrl, note, timestamp, folder_id  }, ...]
   * */
	static async getAllSample(username, folderName) {
		const samples = await db.query(
			`SELECT se.*
                    FROM sample_entry se
                    JOIN sample_folder sf ON sf.id = se.folder_id
                    WHERE sf.folder_name = $2 AND se.username = $1`,
			[ username, folderName ]
		);
		
		return samples.rows;
	}

	/** Update sample data with `data`.
 
   * Data can include: { common_name, scientific_name, quantity, location, image_url, note}
   *
   * Returns { sample_id, commonName, scientificName, quantity, location, imageUrl, note, timestamp, folder_id  }
   *
   * Throws NotFoundError if not found.
   */

	static async update(sample_id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			commonName: 'common_name',
			scientificName: 'scientific_name',
			imageUrl: 'image_url'
		});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE sample_entry 
                          SET ${setCols} 
                          WHERE sample_id= ${idVarIdx} 
                          RETURNING sample_id, 
                          common_name AS "commonName", scientific_name AS "scientificName", quantity, 
                          location, 
                          image_url AS "imageUrl", 
                          note`;
		const result = await db.query(querySql, [ ...values, sample_id ]);
		const sample = result.rows[0];

		if (!sample) throw new NotFoundError(`No sample with the Id: ${sample_id}`);

		return sample;
	}
	/** Delete given sample from database; returns undefined.
   *
   * Throws NotFoundError sample id is not found.
   **/
	static async remove(sample_id) {
		const result = await db.query(
			`DELETE sample_entry
               FROM 
               WHERE sample_id = $1
               RETURNING id`,
			[ sample_id ]
		);
		const sample = result.rows[0];

		if (!sample) throw new NotFoundError(`No sample with the id: ${id}`);
	}
}
module.exports = SampleEntry;
