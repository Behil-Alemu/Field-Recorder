//SELECT * FROM sample_folder WHERE folder_name = 'My First Project';
SELECT * FROM sample_entry WHERE username = 'First';
SELECT se.*
FROM sample_entry se
JOIN sample_folder sf ON sf.id = se.folder_id
WHERE sf.folder_name = 'My First Project' AND se.username = 'First';
first do this as a get request 
https://explorer.natureserve.org/api/data/suggestions/?searchTerm=frog&recordType=ALL
once selected go by taxa id

https://explorer.natureserve.org/api/data/taxon/ELEMENT_GLOBAL.2.106149