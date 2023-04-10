'use strict';

const db = require('../db');
const { NotFoundError, BadRequestError } = require('../expressError.cjs');
const { sqlForPartialUpdate } = require('../helpers/sql');

class Folder {
	/**add folder info to sample_col data.
   * data should be { folder_name }
   * Returns { id, folderName, username }
   **/

	static async add({ folderName, username }) {
		const duplicateCheck = await db.query(
			`SELECT folder_name, username
			FROM sample_folder
			WHERE folder_name = $1`,
			[ folderName ]
		);

		if (duplicateCheck.rows[0]) throw new BadRequestError(`Duplicate folder Name: ${folderName}`);

		const result = await db.query(
			`INSERT INTO sample_folder (folder_name, username)
		   VALUES ($1, $2)
		   RETURNING id, folder_name AS "folderName", username`,
			[ folderName, username ]
		);
		let sampleFolder = result.rows[0];

		return sampleFolder;
	}

	/* Returns [{folderName}, ...]
    * */
	static async getAllFolder(username) {
		const folder = await db.query(
			`SELECT id, folder_name AS folderName
            FROM sample_folder 
            WHERE sample_folder.username = $1;`,
			[ username ]
		);
		if (!folder.rows) throw new BadRequestError(`No folders:`);

		return folder.rows;
	}

	/** Update folder data with `data`.
   * Data can include: { folder_name}
   * Returns { id, commonName, username  }
   * Throws NotFoundError if not found.
   */
	static async update(id, data) {
		const { setCols, values } = sqlForPartialUpdate(data, {
			folderName: 'folder_name'
		});
		const idVarIdx = '$' + (values.length + 1);

		const querySql = `UPDATE sample_folder 
                          SET ${setCols} 
                          WHERE id= ${idVarIdx} 
                          RETURNING id, 
                          folder_name AS "folderName"`;
		const result = await db.query(querySql, [ ...values, id ]);
		const folderName = result.rows[0];

		if (!folderName) throw new NotFoundError(`No folder with the Id: ${id}`);

		return folderName;
	}

	/** Delete given folder from database; returns undefined.
   **/
	static async remove(id) {
		const result = await db.query(
			`DELETE FROM sample_folder
		   WHERE id = $1
		   RETURNING id`,
			[ id ]
		);
		const folder = result.rows[0];

		if (!folder) throw new NotFoundError(`No sample with the id: ${id}`);
	}
}

module.exports = Folder;
