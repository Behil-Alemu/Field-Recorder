//SELECT * FROM sample_folder WHERE folder_name = 'My First Project';

SELECT * FROM sample_entry WHERE username = 'First';

SELECT se.*
FROM sample_entry se
JOIN sample_folder sf ON sf.id = se.folder_id
WHERE sf.folder_name = 'Bug' AND se.username = 'behil';

SELECT se.*
FROM sample_entry se
JOIN sample_folder sf ON sf.id = se.folder_id
WHERE sf.folder_name = 'My First Project' AND se.username = 'First';


SELECT folder_name AS folderName
FROM sample_folder sf
JOIN users u ON u.username = sf.username
WHERE sf.username = 'First';

SELECT folder_name AS folderName
FROM sample_folder 
WHERE sample_folder.username = 'First';

first do this as a get request 
https://explorer.natureserve.org/api/data/suggestions/?searchTerm=frog&recordType=ALL
once selected go by taxa id

https://explorer.natureserve.org/api/data/taxon/ELEMENT_GLOBAL.2.106149

for chakra landing page. https://codesandbox.io/s/landing-page-with-chakra-ui-forked-o4uusw?file=/package.json:281-361